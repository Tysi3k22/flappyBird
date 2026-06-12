import { Bird } from "./bird.js";
import {Pillar} from './pillar.js';
import { collision } from "./collision.js";

export const canvas = document.getElementById('game');
export const ctx = canvas.getContext('2d');

export const gameState = {
    state: ""
};

export let score = 0;

export function addToScore() {
    score++;
}

export function resetScore() {
    score = 0;
}

const pillar = [
    {x: canvas.width, y: 100},
    {x: canvas.width, y: 200},
    {x: canvas.width, y: 300},
    {x: canvas.width, y: 600},
    {x: canvas.width, y: 400}
]

function updateScore() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    ctx.fillText(score, 600, 50);
}
canvas.width = 1200;
canvas.height = 800;
 
var bird;
var pilar;

function main() {
    bird = new Bird(ctx, 600, canvas.height / 2, 0, -8, 0.5, 20);
    pilar = new Pillar(pillar, 80, bird);  
}

function loop() {
    requestAnimationFrame(loop);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bird.updateBird();
    pilar.updatePillars();
    collision(bird, pilar);
    updateScore();
}

main();
loop();