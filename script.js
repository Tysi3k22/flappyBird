const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

function Bird(x, y, velocity, jumpForce, gravity, radius) {
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
            }

        })
    }
}

var bird;

function main() {
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    bird = new Bird(canvas.width / 2, canvas.height / 2, 0, -8, 0.5, 20);
}

function loop() {
    requestAnimationFrame(loop);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bird.updateBird();
}

main();
loop();