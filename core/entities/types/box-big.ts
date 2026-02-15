import type { Vector2 } from '2d-physics-engine';
import { Sprite, Texture } from 'webgl-renderer';
import Entity from '../entity.ts';
import { registerEntity } from '../registry.ts';
import texturePath from '../textures/box-big.png';

const texture = await Texture.load(texturePath, { antialias: false });

export default class BoxBig extends Entity {
    drawable = new Sprite(texture);

    constructor(position: Vector2, rotation: number) {
        super(position, rotation);
        this.addBoxCollider(4, 4);
        this.body.setMass(10);
    }
}

registerEntity(BoxBig, 0x2D29);