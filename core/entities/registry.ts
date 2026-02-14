import type { Vector2 } from '2d-physics-engine';
import type Entity from './entity.ts';

export type EntityConstructor = new (position: Vector2, rotation: number, flags: number) => Entity;

const codeToEntity = new Map<number, EntityConstructor>();
const entityToCode = new Map<EntityConstructor, number>();

export function registerEntity(entity: EntityConstructor, code: number) {
    codeToEntity.set(code, entity);
    entityToCode.set(entity, code);
}

export function getEntityByCode(code: number) {
    return codeToEntity.get(code) || null;
}

export function getCodeByEntity(entity: EntityConstructor) {
    return entityToCode.get(entity)!;
}