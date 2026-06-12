import { Bird } from "./bird.js";

export const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = 1200;
canvas.height = 800;

const pillar = [
    {x: canvas.width, y: 100},
    {x: canvas.width, y: 200},
    {x: canvas.width, y: 300},
    {x: canvas.width, y: 600},
    {x: canvas.width, y: 400}
]

function Pillar(pillars, gap) {
    this.pillars = pillars;
    this.gap = gap;
    this.active = [];

    this.spawnPillar = () => {
        const random = this.pillars[Math.floor(Math.random() * this.pillars.length)];
        this.active.push({ x: canvas.width, y: random.y, spawned: false });
    };

    this.drawPillar = (pillar) => {
        ctx.beginPath();
        ctx.rect(pillar.x, 0, 30, pillar.y - this.gap);
        ctx.rect(pillar.x, pillar.y + this.gap, 30, canvas.height);
        ctx.fillStyle = 'orange';
        ctx.fill();
        ctx.closePath();
    };

    this.updatePillars = () => {
        this.active.forEach(p => {
            p.x -= 2;
            this.drawPillar(p);

            if (p.x + 30 < canvas.width / 2 && !p.spawned) {
                p.spawned = true;
                this.spawnPillar();
            }
        });

        this.active = this.active.filter(p => p.x + 30 > 0);
    };
    

    this.spawnPillar();
}  

export const gameState = {
    state: ""
};

var bird;
var pilar;
var randomIndex;

function main() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    bird = new Bird(ctx, 600, canvas.height / 2, 0, -8, 0.5, 20);
    pilar = new Pillar(pillar, 80);  
}



function loop() {
    requestAnimationFrame(loop);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bird.updateBird();
    pilar.updatePillars();
}

main();
loop();