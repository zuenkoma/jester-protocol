import { Body, BoxCollider, Vector2 } from '2d-physics-engine';
import type { Drawable } from 'webgl-renderer';

export default abstract class Entity {
    abstract drawable: Drawable;
    body: Body;

    constructor(x: number, y: number, rotation = 0) {
        this.body = new Body(new Vector2(x, y), rotation);
    }

    protected addBoxCollider(width: number, height: number) {
        this.body.addCollider(new BoxCollider(new Vector2(width, height)));
    }

    update(dt: number) {
        this.drawable.x = this.body.position.x;
        this.drawable.y = this.body.position.y;
        this.drawable.rotation = this.body.rotation * 180 / Math.PI;
        this.drawable.update(dt);
    }
}