import { Sprite, Texture } from 'webgl-renderer';
import Entity from './entity.ts';
import texturePath from '../textures/platform-thin.png';

const texture = await Texture.load(texturePath);

export default class PlatformThin extends Entity {
    drawable = new Sprite(texture);

    constructor(x: number, y: number, rotation: number) {
        super(x, y, rotation);
        this.addBoxCollider(2.5, 1.25);
        this.body.setMass(0);
    }
}