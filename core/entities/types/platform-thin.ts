import type { Vector2 } from '2d-physics-engine';
import { Sprite, Texture } from 'webgl-renderer';
import Entity from '../entity.ts';
import { registerEntity } from '../registry.ts';
import texturePath from '../textures/platform-thin.png';

const texture = await Texture.load(texturePath);

export default class PlatformThin extends Entity {
    drawable = new Sprite(texture);

    constructor(position: Vector2, rotation: number) {
        super(position, rotation);
        this.addBoxCollider(2.5, 1.25);
        this.body.setMass(0);
    }
}

registerEntity(PlatformThin, 0x1547);