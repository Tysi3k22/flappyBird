import {gameState, canvas} from './script.js';

export function Bird(ctx, x, y, velocity, jumpForce, gravity, radius) {
    this.ctx = ctx;
    this.x = x; 
    this.y = y;
    this.velocity = velocity;
    this.jumpForce = jumpForce;
    this.gravity = gravity;
    this.radius = radius;

    this.drawBird = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'orange';
        ctx.fill();
        ctx.closePath();
    }

    this.updateBird = () => { 
        if(this.y + this.radius > canvas.height) {
            gameState.state = "gameOver";
            this.velocity = 0;
            this.gravity = 0;
        }

        this.velocity += this.gravity;
        this.y += this.velocity;
        
        this.jump();
        this.drawBird();
    }

    this.jump = () => {
        document.addEventListener('keydown', (e) => {
            if(e.key.includes(' ')) {
                this.velocity = this.jumpForce;
                e.preventDefault();

                if(gameState.state === "gameOver") {
                    this.reset();
                    gameState.state = "";
                }
            }

        })
    }

    this.reset = () => {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.jumpForce = jumpForce;
        this.gravity = gravity;
    }
}
