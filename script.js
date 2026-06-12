import { Bird } from "./bird.js";

export const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = 1200;
canvas.height = 800;

const pillar = [
    {x: 0, y: 100},
    {x: 0, y: 200},
    {x: 0, y: 300},
    {x: 0, y: 600},
    {x: 0, y: 400}
]

function Pillar(pillars, gap) {
    this.pillars = pillars;
    this.gap = gap;

    this.drawPillar = (index) => {
        ctx.beginPath();
        ctx.rect(this.pillars[index].x, 0, 30, this.pillars[index].y - this.gap)
        ctx.rect(this.pillars[index].x, this.pillars[index].y + gap, 30, canvas.height - this.pillars[index].y - this.gap)
        ctx.fillStyle = 'orange';
        ctx.fill();
        ctx.closePath();
    }

    this.drawRandomPillars = () => {

    }
}

export const gameState = {
    state: ""
};

var bird;
var pilar;

function main() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    bird = new Bird(ctx, canvas.width / 2, canvas.height / 2, 0, -8, 0.5, 20);
    pilar = new Pillar(pillar, 80);    
}

function loop() {
    requestAnimationFrame(loop);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bird.updateBird();
    pilar.drawPillar(4);
}

main();
loop();