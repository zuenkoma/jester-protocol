import { Renderer } from 'webgl-renderer';
import Room from '../core/room.ts';
import { Vector2 } from '2d-physics-engine';
import Platform from '../core/entities/types/platform.ts';
import BoxSmall from '../core/entities/types/box-small.ts';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const renderer = new Renderer(canvas, false);

const room = new Room(0, new Vector2(-20, 0), 0);

const p = new Platform(new Vector2(0, -170), 0);
room.addEntity(p);

room.addEntity(new BoxSmall(new Vector2(30, 0), 0));
room.addEntity(new BoxSmall(new Vector2(15, 100), 0));
room.addEntity(new BoxSmall(new Vector2(-22, 200), 0));

let resized = true;
addEventListener('resize', () => resized = true);

const pressed = new Set<string>();
addEventListener('keydown', event => pressed.add(event.code));
addEventListener('keyup', event => pressed.delete(event.code));
addEventListener('blur', () => pressed.clear());

let lastTime = Date.now();
function render() {
    const dt = (Date.now() - lastTime);
    lastTime = Date.now();

    if (resized) {
        const aspect = 16 / 9;
        if (innerWidth / aspect < innerHeight - 50) {
            canvas.width = innerWidth;
            canvas.height = innerWidth / aspect;
        }
        else {
            canvas.width = (innerHeight - 50) * aspect;
            canvas.height = innerHeight - 50;
        }
        room.drawable.scaleX = canvas.width / 1024;
        room.drawable.scaleY = canvas.height / 576;
        resized = false;
    }

    if (pressed.has('ArrowUp') && Math.abs(room.player.body.velocity.y) < 0.1) {
        room.player.body.applyImpulse(new Vector2(0, 21));
    }
    if (pressed.has('ArrowLeft')) {
        room.player.body.applyImpulse(new Vector2(-5, 0));
        if (room.player.body.velocity.x < -5) room.player.body.velocity.x = -5;
    }
    if (pressed.has('ArrowRight')) {
        room.player.body.applyImpulse(new Vector2(5, 0));
        if (room.player.body.velocity.x > 5) room.player.body.velocity.x = 5;
    }

    room.update(dt);
    renderer.render(room.drawable);
    requestAnimationFrame(render);
}
requestAnimationFrame(render);
