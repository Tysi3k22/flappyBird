const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

function Bird(x, y, dy, radius) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.radius = radius;

    this.drawBird = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'orange';
        ctx.fill();
    }

    this.updateBird = () => {
        this.y += this.dy;

        this.drawBird();
    }
}

var bird;

function main() {
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    bird = new Bird(100, 75, 0.2, 20);
}

function loop() {
    requestAnimationFrame(loop);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bird.updateBird();
}

main();
loop();
