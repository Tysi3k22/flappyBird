import { gameState, score, addToScore } from "./main.js";

export function collision(bird, pilar) {
    pilar.active.forEach(p => {
        const birdX = bird.getX();
        const birdY = bird.getY();
        const radius = 20;

        const hitX = birdX + radius > p.x && birdX - radius < p.x + 30;

        const hitY = birdY - radius < p.y - pilar.gap || birdY + radius > p.y + pilar.gap;

        if (hitX && hitY) {
            gameState.state = "gameOver";
            pilar.resetMap();
        }

        if (!p.passed && birdX > p.x + 30) {
            p.passed = true;
            addToScore();
        }
    });
}
