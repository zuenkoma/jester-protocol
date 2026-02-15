import { CapsuleCollider, CircleCollider, Vector2 } from '2d-physics-engine';
import { Sprite, Texture } from 'webgl-renderer';
import texturePath from '../textures/player-stay.png';
import Entity from '../entity.ts';

const texture = await Texture.load(texturePath, { antialias: false });

export default class Player extends Entity {
    drawable = new Sprite(texture);

    constructor(position: Vector2, rotation: number) {
        super(position, rotation);
        this.body.addCollider(new CapsuleCollider(1.35, 0.25));
        this.body.setFixedRotation(true);
        this.body.setMass(1);
    }

    update(dt: number) {
        if (this.body.velocity.x > 1e-6) this.drawable.scaleX = 1;
        if (this.body.velocity.x < -1e-6) this.drawable.scaleX = -1;
        super.update(dt);
    }
}