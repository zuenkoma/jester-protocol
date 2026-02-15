import type { Vector2 } from '2d-physics-engine';
import { Sprite, Texture } from 'webgl-renderer';
import Entity from '../entity.ts';
import { registerEntity } from '../registry.ts';
import texturePath from '../textures/platform.png';

const texture = await Texture.load(texturePath, { antialias: false });

export default class Platform extends Entity {
    drawable = new Sprite(texture);

    constructor(position: Vector2, rotation: number) {
        super(position, rotation);
        this.addBoxCollider(2, 1);
    }
}

registerEntity(Platform, 0x326B);