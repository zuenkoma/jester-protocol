import { Body, BoxCollider, Vector2 } from '2d-physics-engine';
import type { Drawable } from 'webgl-renderer';

export default abstract class Entity {
    abstract drawable: Drawable;
    body: Body;

    constructor(position: Vector2, rotation = 0) {
        this.body = new Body(position.clone().div(32), rotation);
    }

    protected addBoxCollider(width: number, height: number) {
        this.body.addCollider(new BoxCollider(new Vector2(width, height)));
    }

    getPosition() {
        return this.body.position;
    }
    setPosition(position: Vector2) {
        this.body.position = position;
    }

    getRotation() {
        return this.body.rotation;
    }
    setRotation(rotation: number) {
        this.body.rotation = rotation;
    }

    getFlags() {
        return 0;
    }

    update(dt: number) {
        const position = this.body.position.clone().mult(32);
        this.drawable.x = position.x;
        this.drawable.y = position.y;
        this.drawable.rotation = this.body.rotation * 180 / Math.PI;
        this.drawable.update(dt);
    }
}