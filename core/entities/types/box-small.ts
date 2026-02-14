import type { Vector2 } from '2d-physics-engine';
import { Sprite, Texture } from 'webgl-renderer';
import Entity from '../entity.ts';
import { registerEntity } from '../registry.ts';
import texturePath from '../textures/box-small.png';

const texture = await Texture.load(texturePath);

export default class BoxSmall extends Entity {
    drawable = new Sprite(texture);

    constructor(position: Vector2, rotation: number) {
        super(position, rotation);
        this.addBoxCollider(2.5, 2.5);
    }
}

registerEntity(BoxSmall, 0x80CC);