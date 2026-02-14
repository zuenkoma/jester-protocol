import { Vector2, World } from '2d-physics-engine';
import { Drawable, Sprite, type Texture } from 'webgl-renderer';
import type Entity from './entities/entity.ts';
import Player from './entities/types/player.ts';
import type Wire from './wire.ts';

const backgrounds: Texture[] = [];

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
        this.background = new Sprite(backgrounds[backgroundTint % backgrounds.length]);
        this.drawable.addChild(this.background);

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
        this.world.step(dt);
        this.drawable.update(dt);
    }
}