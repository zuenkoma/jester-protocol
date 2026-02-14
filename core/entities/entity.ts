import type { Body } from '2d-physics-engine';
import type { Drawable } from 'webgl-renderer';

export default abstract class Entity {
    abstract drawable: Drawable;
    abstract body: Body;

    update(dt: number) {
        this.drawable.x = this.body.position.x;
        this.drawable.y = this.body.position.y;
        this.drawable.rotation = this.body.rotation * 180 / Math.PI;
        this.drawable.update(dt);
    }
}