const canvas_rain = document.getElementById('rain-canvas');
const canvas_waterflower = document.getElementById('waterflower-canvas');
const ctx_rain = canvas_rain.getContext('2d');
const ctx_waterflower = canvas_waterflower.getContext('2d');

function resizeCanvas() {
    canvas_rain.width = window.innerWidth;
    canvas_rain.height = window.innerHeight;
    canvas_waterflower.width = window.innerWidth;
    canvas_waterflower.height = window.innerHeight;
    syncRaindropCount();
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

class Raindrop {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = (Math.random() + 0.3) * canvas_rain.width;
        this.y = Math.random() * -canvas_rain.height;
        this.v = Math.random() * 4 + 5;
        this.length = Math.random() * 10 + 40;
        this.opacity = Math.random() * 0.2 + 0.6;
    }

    update() {
        this.y += this.v;
        this.x += this.v * (-0.3);
        if (this.y > canvas_rain.height) {
            this.reset();
        }
    }

    draw() {
        const gradient = ctx_rain.createLinearGradient(this.x, this.y, this.x, this.y + this.length);
        gradient.addColorStop(0, 'rgba(164, 227, 248, 0)');
        gradient.addColorStop(1, 'rgba(102, 178, 255, ' + this.opacity + ')');
        ctx_rain.shadowBlur = 2;
        ctx_rain.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx_rain.beginPath();
        ctx_rain.strokeStyle = gradient;
        ctx_rain.lineWidth = 2;
        ctx_rain.moveTo(this.x, this.y);
        ctx_rain.lineTo(this.x - this.length * 0.3, this.y + this.length);
        ctx_rain.stroke();
    }
}

class Splash {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() * -1.5) - 1.5;
        this.gravity = 0.07;
        this.radius = Math.random() * 2.5 + 1.5;
        this.opacity = 1;
        this.decay = Math.random() * 0.012 + 0.004;
    }

    update() {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= this.decay;
    }

    draw() {
        ctx_waterflower.save();

        // 径向渐变：白色高光中心 → 半透明水蓝色边缘
        const gradient = ctx_waterflower.createRadialGradient(
            this.x - this.radius * 0.35, this.y - this.radius * 0.35, 0,
            this.x, this.y, this.radius
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, ' + (this.opacity * 0.9) + ')');
        gradient.addColorStop(0.3, 'rgba(140, 200, 255, ' + (this.opacity * 0.85) + ')');
        gradient.addColorStop(1, 'rgba(100, 180, 255, ' + (this.opacity * 0.6) + ')');

        ctx_waterflower.beginPath();
        ctx_waterflower.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx_waterflower.fillStyle = gradient;
        ctx_waterflower.fill();

        ctx_waterflower.restore();
    }
}

const raindrops = [];
const splashes = [];

function getTargetRaindropCount() {
    if (reduceMotion) {
        return 0;
    }
    if (window.innerWidth < 600) {
        return 35;
    }
    if (window.innerWidth < 1000) {
        return 70;
    }
    return 100;
}

function syncRaindropCount() {
    const target = getTargetRaindropCount();

    while (raindrops.length < target) {
        raindrops.push(new Raindrop());
    }

    while (raindrops.length > target) {
        raindrops.pop();
    }
}

window.addEventListener('mousedown', function (e) {
    if (reduceMotion) {
        return;
    }
    for (let i = 0; i < 14; i++) {
        splashes.push(new Splash(e.clientX, e.clientY));
    }
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function animate() {
    if (reduceMotion) {
        return;
    }

    ctx_rain.clearRect(0, 0, canvas_rain.width, canvas_rain.height);
    ctx_waterflower.clearRect(0, 0, canvas_waterflower.width, canvas_waterflower.height);

    for (let i = 0; i < raindrops.length; i++) {
        raindrops[i].update();
        raindrops[i].draw();
    }

    for (let i = 0; i < splashes.length; i++) {
        const s = splashes[i];
        s.update();
        s.draw();

        if (s.opacity <= 0) {
            splashes.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(animate);
}

animate();
