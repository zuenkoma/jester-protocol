import type { Vector2 } from '2d-physics-engine';
import { Sprite, Texture } from 'webgl-renderer';
import texturePath from '../textures/player.png';
import Entity from '../entity.ts';

const texture = await Texture.load(texturePath);

export default class Player extends Entity {
    drawable = new Sprite(texture);

    constructor(position: Vector2, rotation: number) {
        super(position, rotation);
        this.addBoxCollider(2.5, 1.25);
        this.body.setMass(0);
    }
}