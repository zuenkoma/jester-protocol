import { Sprite, Texture } from 'webgl-renderer';
import Entity from './entity.ts';
import texturePath from '../textures/box-small.png';

const texture = await Texture.load(texturePath);

export default class BoxSmall extends Entity {
    drawable = new Sprite(texture);

    constructor(x: number, y: number, rotation: number) {
        super(x, y, rotation);
        this.addBoxCollider(2.5, 2.5);
    }
}