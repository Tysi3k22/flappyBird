import { gameState, canvas, ctx, resetScore } from "./main.js";

let pillar_bottom = new Image();
pillar_bottom.src = './assets/bottompipe.png';
let pillar_top = new Image();
pillar_top.src = './assets/toppipe.png';

export function Pillar(pillars, gap, bird) {
    this.pillars = pillars;
    this.gap = gap;
    this.active = [];

    this.spawnPillar = () => {
        const random = this.pillars[Math.floor(Math.random() * this.pillars.length)];
        this.active.push({ x: canvas.width, y: random.y, spawned: false });
    };

    this.drawPillar = (pillar) => {
        ctx.drawImage(pillar_bottom, pillar.x, pillar.y + this.gap, 30, canvas.height)
        ctx.drawImage(pillar_top, pillar.x, 0, 30, pillar.y - this.gap)
    };

    this.updatePillars = () => {
        if(gameState.state === "gameOver") {
            this.stopPillars();
            return;
        }
        this.active.forEach(p => {
            p.x -= 2;
            this.drawPillar(p);

            if (p.x + 35 < canvas.width / 2 && !p.spawned) {
                p.spawned = true;
                this.spawnPillar();
            }
        });

        this.active = this.active.filter(p => p.x + 30 > 0);
    };
    
    this.stopPillars = () => {
        this.active.forEach(p => {
            p.x = p.x;
            this.drawPillar(p);
        })
    }

    this.resetMap = () => {
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ' && gameState.state === "gameOver") {
                e.preventDefault();
                resetScore();
                gameState.state = '';
                this.active = [];
                this.spawnPillar();
                bird.reset();
            }
        });
    }

    this.spawnPillar();
    this.resetMap();
}  