import { Vector2, World } from '2d-physics-engine';
import { Drawable, Sprite, Texture } from 'webgl-renderer';
import backgroundTexture1 from './backgrounds/1.png';
import backgroundTexture2 from './backgrounds/2.png';
import type Entity from './entities/entity.ts';
import Player from './entities/types/player.ts';
import type Wire from './wire.ts';
import Border from './entities/types/border.ts';

const backgrounds = await Promise.all([
    Texture.load(backgroundTexture1, { antialias: false }),
    Texture.load(backgroundTexture2, { antialias: false })
]);

interface CachedEntity {
    position: Vector2;
    rotation: number;
}

export default class Room {
    private cachedEntities: Map<Entity, CachedEntity> = new Map();
    wires: Set<Wire> = new Set();

    player: Player;
    drawable = new Drawable();
    private world = new World();
    private background: Sprite;

    constructor(
        backgroundTint: number,
        playerSpawnPosition: Vector2,
        playerSpawnRotation: number
    ) {
        this.world.gravity.y *= 2;

        this.background = new Sprite(backgrounds[backgroundTint % backgrounds.length]);
        this.drawable.addChild(this.background);

        this.addEntity(new Border(new Vector2(0, 0), 0));

        this.player = new Player(playerSpawnPosition, playerSpawnRotation);
        this.addEntity(this.player);
    }

    getBackgroundTint() {
        return backgrounds.indexOf(this.background.texture);
    }
    setBackgroundTint(tint: number) {
        this.background.texture = backgrounds[tint % backgrounds.length];
    }

    addEntity(entity: Entity) {
        this.world.addBody(entity.body);
        this.drawable.addChild(entity.drawable);
        this.cachedEntities.set(entity, {
            position: entity.getPosition(),
            rotation: entity.getRotation(),
        });
    }
    removeEntity(entity: Entity) {
        this.drawable.removeChild(entity.drawable);
        this.world.removeBody(entity.body);
        this.cachedEntities.delete(entity);
    }
    getEntities() {
        return Array.from(this.cachedEntities.keys());
    }

    addWire(wire: Wire) {
        this.wires.add(wire);
    }
    removeWire(wire: Wire) {
        this.wires.delete(wire);
    }

    reset() {
        for (const [entity, cachedEntity] of this.cachedEntities) {
            entity.setPosition(cachedEntity.position);
            entity.setRotation(cachedEntity.rotation);
            entity.body.velocity = new Vector2(0, 0);
            entity.body.angularVelocity = 0;
        }
    }

    update(dt: number) {
        this.world.step(dt / 1000);
        for (const entity of this.getEntities()) {
            entity.update(dt);
        }
    }
}