import { Bird } from "./bird.js";

export const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

export const gameState = {
    state: ""
};

canvas.width = 1200;
canvas.height = 800;

var bird;

function main() {
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    bird = new Bird(ctx, canvas.width / 2, canvas.height / 2, 0, -8, 0.5, 20);
}

function loop() {
    requestAnimationFrame(loop);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bird.updateBird();
}

main();
loop();