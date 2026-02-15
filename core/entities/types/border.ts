import { BoxCollider, Vector2 } from '2d-physics-engine';
import { Sprite, Texture } from 'webgl-renderer';
import Entity from '../entity.ts';
import texturePath from '../textures/border.png';

const texture = await Texture.load(texturePath, { antialias: false });

export default class Border extends Entity {
    drawable = new Sprite(texture);

    constructor(position: Vector2, rotation: number) {
        super(position, rotation);
        this.body.addCollider(new BoxCollider(new Vector2(32, 1), new Vector2(0, 8.5)));
        this.body.addCollider(new BoxCollider(new Vector2(1, 18), new Vector2(15.5, 0)));
        this.body.addCollider(new BoxCollider(new Vector2(32, 1), new Vector2(0, -8.5)));
        this.body.addCollider(new BoxCollider(new Vector2(1, 18), new Vector2(-15.5, 0)));
    }
}