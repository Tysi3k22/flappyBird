import { Bird } from "./bird.js";
import {Pillar} from './pillar.js';
import { collision } from "./collision.js";

export const canvas = document.getElementById('game');
export const ctx = canvas.getContext('2d');

canvas.width = 360;
canvas.height = 640;

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

const pillar = []

function fillPilars() {
    let y = 100;

    while(y < canvas.height - 100) {
        y += 25;

        pillar.push({x: canvas.width, y: y});
    }
}

console.log(pillar)
fillPilars();

function updateScore() {
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    ctx.fillText(score, canvas.width / 2, 50);
}

 
var bird;
var pilar;

function main() {
    bird = new Bird(ctx, canvas.width / 2, canvas.height / 2, 0, -6, 0.4, 30);
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