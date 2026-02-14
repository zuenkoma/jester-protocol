import { BinaryWriter } from 'binary-rw';
import { getCodeByEntity, type EntityConstructor } from '../entities/registry.ts';
import type Room from '../room.ts';

export default function encodeJPL(rooms: Room[]) {
    const writer = new BinaryWriter();
    writer.writeUint8(0x4A); // magic byte J
    writer.writeUint8(0x50); // magic byte P
    writer.writeUint8(0x4C); // magic byte L

    writer.writeUint8(rooms.length);
    for (const room of rooms) {
        writer.writeUint8(room.getBackgroundTint());
        writer.writeInt16(room.player.getPosition().x);
        writer.writeInt16(room.player.getPosition().y);
        writer.writeUint16(room.player.getRotation());

        const entities = room.getEntities();
        writer.writeUint16(entities.length);
        for (const entity of entities) {
            writer.writeUint16(getCodeByEntity(entity.constructor as EntityConstructor));
            writer.writeInt16(entity.getPosition().x);
            writer.writeInt16(entity.getPosition().y);
            writer.writeUint16(entity.getRotation());
            writer.writeUint16(entity.getFlags());
        }

        writer.writeUint16(room.wires.size);
        for (const wire of room.wires) {
            writer.writeUint16(entities.indexOf(wire.startEntity));
            writer.writeUint16(entities.indexOf(wire.endEntity));
            writer.writeUint8(wire.flags);
            writer.writeUint16(wire.points.length);
            for (const point of wire.points) {
                writer.writeInt16(point.x);
                writer.writeInt16(point.y);
            }
        }
    }
}