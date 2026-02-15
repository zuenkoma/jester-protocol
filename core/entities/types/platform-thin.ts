import type { Vector2 } from '2d-physics-engine';
import { Sprite, Texture } from 'webgl-renderer';
import Entity from '../entity.ts';
import { registerEntity } from '../registry.ts';
import texturePath from '../textures/platform-thin.png';

const texture = await Texture.load(texturePath, { antialias: false });

export default class PlatformThin extends Entity {
    drawable = new Sprite(texture);

    constructor(position: Vector2, rotation: number) {
        super(position, rotation);
        this.addBoxCollider(2, 0.5);
    }
}

registerEntity(PlatformThin, 0x1547);