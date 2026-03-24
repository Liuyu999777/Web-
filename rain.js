const canvas_rain = document.getElementById('rain-canvas');
const canvas_waterflower = document.getElementById('waterflower-canvas');
const ctx_rain = canvas_rain.getContext('2d');
const ctx_waterflower = canvas_waterflower.getContext('2d');

function resizeCanvas() {
    canvas_rain.width = window.innerWidth;
    canvas_rain.height = window.innerHeight;
    canvas_waterflower.width = window.innerWidth;
    canvas_waterflower.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Raindrop {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = (Math.random()+0.3) * canvas_rain.width;
        this.y = Math.random() * -canvas_rain.height;
        this.v = Math.random() * 4 + 5;
        this.length = Math.random() * 10 + 40; 
        this.opacity = Math.random() * 0.2 + 0.6;
    }

    update() {
        this.y += this.v;
        this.x += this.v*(-0.3);
        if (this.y > canvas_rain.height) {
            this.reset();
        }
    }

    draw() {
        let gradient = ctx_rain.createLinearGradient(this.x, this.y, this.x, this.y + this.length);
        gradient.addColorStop(0, 'rgba(164, 227, 248, 0)');
        gradient.addColorStop(1, `rgba(102, 178, 255, ${this.opacity})`);
        ctx_rain.shadowBlur = 2;
        ctx_rain.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx_rain.beginPath();
        ctx_rain.strokeStyle = gradient;
        ctx_rain.lineWidth = 2;
        ctx_rain.moveTo(this.x, this.y);
        ctx_rain.lineTo(this.x -this.length*0.3, this.y + this.length); 
        ctx_rain.stroke();
    }
}

class Splash {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 3; 
        this.vy = (Math.random() * -2) - 2;
        this.gravity = 0.1;
        this.radius = Math.random() * 2 + 1;
        this.opacity = 1;
        this.decay = Math.random() * 0.02 + 0.001;
    }

    update() {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= this.decay;
    }

    draw(ctx) {
        ctx_waterflower.save();
        ctx_waterflower.beginPath();
        ctx_waterflower.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx_waterflower.fillStyle = `rgba(77, 203, 245, ${this.opacity})`;
        ctx_waterflower.fill();
        ctx_waterflower.restore();
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
    ctx_rain.clearRect(0, 0, canvas_rain.width, canvas_rain.height);
    ctx_waterflower.clearRect(0, 0, canvas_waterflower.width, canvas_waterflower.height);

    for (let i = 0; i < raindrops.length; i++) {
        const s = raindrops[i];
        s.update();
        s.draw();
    }

    for (let i = 0; i < splashes.length; i++) {
        const s = splashes[i];
        s.update();
        s.draw(ctx_waterflower);

        if (s.opacity <= 0) {
            splashes.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

animate()