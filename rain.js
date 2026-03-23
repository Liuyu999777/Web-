const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Raindrop {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = (Math.random()+0.3) * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.v = Math.random() * 4 + 5;
        this.length = Math.random() * 10 + 40; 
        this.opacity = Math.random() * 0.2 + 0.6;
    }

    update() {
        this.y += this.v;
        this.x += this.v*(-0.3);
        if (this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        let gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length);
        gradient.addColorStop(0, 'rgba(164, 227, 248, 0)');
        gradient.addColorStop(1, `rgba(102, 178, 255, ${this.opacity})`);
        ctx.shadowBlur = 2;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x -this.length*0.3, this.y + this.length); 
        ctx.stroke();
    }
}

class Splash {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 6; 
        this.vy = (Math.random() * -4) - 2;
        this.gravity = 0.2;
        this.radius = Math.random() * 2 + 1;
        this.opacity = 1;
        this.decay = Math.random() * 0.02 + 0.015;
    }

    update() {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= this.decay;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(77, 203, 245, ${this.opacity})`;
        ctx.fill();
        ctx.restore();
    }
}

const raindrops = [];
const raindropCount = 100;
const splashes = [];

window.addEventListener('mousedown', (e) => {
    for (let i = 0; i < 10; i++) {
        splashes.push(new Splash(e.clientX, e.clientY));
    }
});

for (let i = 0; i < raindropCount; i++) {
    raindrops.push(new Raindrop());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < raindrops.length; i++) {
        raindrops[i].update();
        raindrops[i].draw();
    }

    for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        s.update();
        s.draw(ctx);

        if (s.opacity <= 0) {
            splashes.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

animate()