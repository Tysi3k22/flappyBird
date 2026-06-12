import { gameState, canvas, ctx } from "./script.js";

export function Pillar(pillars, gap, bird) {
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
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    };

    this.updatePillars = () => {
        if(gameState.state === "gameOver") {
            this.stopPillars();
            return;
        }
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