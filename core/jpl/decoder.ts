import { Vector2 } from '2d-physics-engine';
import { BinaryReader } from 'binary-rw';
import { getEntityByCode } from '../entities/registry.ts';
import Room from '../room.ts';
import Wire from '../wire.ts';

export default function decodeJPL(buffer: ArrayBuffer) {
    const reader = new BinaryReader(buffer);

    const magic = [reader.readUint8(), reader.readUint8(), reader.readUint8()];
    if (magic[0] !== 0x4A || magic[1] !== 0x50 || magic[2] !== 0x4C) throw new Error('Invalid JPL file.');

    const roomsNum = reader.readUint8();
    const rooms = [];

    for (let r = 0; r < roomsNum; ++r) {
        const backgroundTint = reader.readUint8();
        const playerSpawnPosition = new Vector2(reader.readInt16(), reader.readInt16());
        const playerSpawnRotation = reader.readUint16();
        const room = new Room(backgroundTint, playerSpawnPosition, playerSpawnRotation);

        const entitiesNum = reader.readUint16();
        const entities = [];
        for (let e = 0; e < entitiesNum; ++e) {
            const Entity = getEntityByCode(reader.readUint16());
            const position = new Vector2(reader.readInt16(), reader.readInt16());
            const rotation = reader.readUint16();
            const flags = reader.readUint16();

            if (!Entity) {
                entities.push(null);
                continue;
            }

            const entity = new Entity(position, rotation, flags);
            room.addEntity(entity);
            entities.push(entity);
        }

        const wiresNum = reader.readUint16();
        for (let w = 0; w < wiresNum; ++w) {
            const startEntity = entities[reader.readUint16()];
            const endEntity = entities[reader.readUint16()];
            const flags = reader.readUint8();

            const pointsNum = reader.readUint16();
            const points: Vector2[] = [];
            for (let p = 0; p < pointsNum; ++p) {
                points.push(new Vector2(reader.readInt16(), reader.readInt16()));
            }

            if (!startEntity || !endEntity) continue;
            room.wires.add(new Wire(startEntity, endEntity, points, flags));
        }

        rooms.push(room);
    }

    return rooms;
}