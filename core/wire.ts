import type { Vector2 } from '2d-physics-engine';
import type Entity from './entities/entity.ts';

export default class Wire {
    startEntity: Entity;
    endEntity: Entity;
    points: Vector2[];
    flags: number;

    constructor(startEntity: Entity, endEntity: Entity, points: Vector2[], flags = 0) {
        this.startEntity = startEntity;
        this.endEntity = endEntity;
        this.points = points;
        this.flags = flags;
    }
}