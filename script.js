class Particle {
    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 3 + 1;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.005;
        this.canvas = canvas;
        this.trail = [];
        this.maxTrailLength = 10;
        this.hue = Math.random() * 360;
        this.brightness = Math.random() * 50 + 50;
        this.mass = this.size * 0.1;
    }

    update(particles, attractors, gravity, speed) {
        // Store trail
        this.trail.push({ x: this.x, y: this.y, life: this.life });
        if (this.trail.length > this.maxTrailLength) {
            this.trail.shift();
        }

        // Apply gravity from attractors
        attractors.forEach(attractor => {
            const dx = attractor.x - this.x;
            const dy = attractor.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0) {
                const force = (gravity * attractor.mass * this.mass) / (distance * distance);
                const angle = Math.atan2(dy, dx);
                
                this.vx += Math.cos(angle) * force * speed;
                this.vy += Math.sin(angle) * force * speed;
            }
        });

        // Particle-to-particle interactions
        particles.forEach(other => {
            if (other !== this) {
                const dx = other.x - this.x;
                const dy = other.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 50 && distance > 0) {
                    const force = 0.01 / (distance * distance);
                    const angle = Math.atan2(dy, dx);
                    
                    this.vx -= Math.cos(angle) * force;
                    this.vy -= Math.sin(angle) * force;
                }
            }
        });

        // Apply velocity
        this.x += this.vx * speed;
        this.y += this.vy * speed;

        // Boundary wrapping
        if (this.x < 0) this.x = this.canvas.width;
        if (this.x > this.canvas.width) this.x = 0;
        if (this.y < 0) this.y = this.canvas.height;
        if (this.y > this.canvas.height) this.y = 0;

        // Apply friction
        this.vx *= 0.999;
        this.vy *= 0.999;

        // Update life
        this.life -= this.decay;
        if (this.life <= 0) {
            this.life = 1;
            this.hue = Math.random() * 360;
        }

        // Update hue for color cycling
        this.hue += 0.5;
        if (this.hue > 360) this.hue = 0;
    }

    draw(ctx, colorMode) {
        // Draw trail
        this.trail.forEach((point, index) => {
            const alpha = (index / this.trail.length) * point.life * 0.3;
            const size = (index / this.trail.length) * this.size * 0.5;
            
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = this.getColor(colorMode, alpha);
            ctx.beginPath();
            ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        // Draw main particle
        ctx.save();
        ctx.globalAlpha = this.life;
        
        // Glow effect
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
        gradient.addColorStop(0, this.getColor(colorMode, this.life));
        gradient.addColorStop(1, this.getColor(colorMode, 0));
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.fillStyle = this.getColor(colorMode, this.life);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }

    getColor(colorMode, alpha = 1) {
        switch (colorMode) {
            case 'rainbow':
                return `hsla(${this.hue}, 100%, ${this.brightness}%, ${alpha})`;
            case 'galaxy':
                return `hsla(${240 + this.hue * 0.3}, 80%, ${this.brightness}%, ${alpha})`;
            case 'fire':
                return `hsla(${this.hue * 0.2}, 100%, ${this.brightness}%, ${alpha})`;
            case 'ocean':
                return `hsla(${180 + this.hue * 0.5}, 70%, ${this.brightness}%, ${alpha})`;
            case 'neon':
                return `hsla(${this.hue}, 100%, 80%, ${alpha})`;
            default:
                return `hsla(${this.hue}, 100%, ${this.brightness}%, ${alpha})`;
        }
    }
}

class Attractor {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.mass = 50;
        this.life = 1;
        this.decay = 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
        this.life -= this.decay;
        this.pulsePhase += 0.1;
        
        if (this.life <= 0) {
            return false; // Mark for removal
        }
        return true;
    }

    draw(ctx) {
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        const size = this.mass * 0.3 * pulse * this.life;
        
        ctx.save();
        ctx.globalAlpha = this.life * 0.8;
        
        // Outer glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, size * 2);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(100, 200, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(255, 255, 255, ${this.life})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, size * 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

class Galaxy {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.particles = [];
        this.attractors = [];
        this.settings = {
            particleCount: 500,
            gravity: 0.5,
            speed: 1,
            colorMode: 'rainbow'
        };
        this.isRunning = true;
        this.mousePos = { x: 0, y: 0 };
        
        this.init();
        this.setupEventListeners();
        this.animate();
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.settings.particleCount; i++) {
            this.particles.push(new Particle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height,
                this.canvas
            ));
        }
    }

    setupEventListeners() {
        // Mouse interaction
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.attractors.push(new Attractor(x, y));
        });

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mousePos.x = e.clientX - rect.left;
            this.mousePos.y = e.clientY - rect.top;
        });

        // Controls
        document.getElementById('particleCount').addEventListener('input', (e) => {
            this.settings.particleCount = parseInt(e.target.value);
            document.getElementById('particleCountValue').textContent = e.target.value;
            this.updateParticleCount();
        });

        document.getElementById('gravity').addEventListener('input', (e) => {
            this.settings.gravity = parseFloat(e.target.value);
            document.getElementById('gravityValue').textContent = e.target.value;
        });

        document.getElementById('speed').addEventListener('input', (e) => {
            this.settings.speed = parseFloat(e.target.value);
            document.getElementById('speedValue').textContent = e.target.value;
        });

        document.getElementById('colorMode').addEventListener('change', (e) => {
            this.settings.colorMode = e.target.value;
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            this.reset();
        });

        document.getElementById('pauseBtn').addEventListener('click', () => {
            this.togglePause();
        });

        document.getElementById('explodeBtn').addEventListener('click', () => {
            this.bigBang();
        });
    }

    updateParticleCount() {
        const currentCount = this.particles.length;
        const targetCount = this.settings.particleCount;

        if (targetCount > currentCount) {
            // Add particles
            for (let i = currentCount; i < targetCount; i++) {
                this.particles.push(new Particle(
                    Math.random() * this.canvas.width,
                    Math.random() * this.canvas.height,
                    this.canvas
                ));
            }
        } else if (targetCount < currentCount) {
            // Remove particles
            this.particles.splice(targetCount);
        }
    }

    reset() {
        this.attractors = [];
        this.init();
    }

    togglePause() {
        this.isRunning = !this.isRunning;
        const btn = document.getElementById('pauseBtn');
        btn.textContent = this.isRunning ? '⏸️ Pause' : '▶️ Play';
        if (this.isRunning) {
            this.animate();
        }
    }

    bigBang() {
        this.particles.forEach(particle => {
            const angle = Math.random() * Math.PI * 2;
            const force = Math.random() * 10 + 5;
            particle.vx += Math.cos(angle) * force;
            particle.vy += Math.sin(angle) * force;
        });

        // Add multiple attractors for chaos
        for (let i = 0; i < 5; i++) {
            this.attractors.push(new Attractor(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height
            ));
        }
    }

    update() {
        // Update particles
        this.particles.forEach(particle => {
            particle.update(this.particles, this.attractors, this.settings.gravity, this.settings.speed);
        });

        // Update attractors
        this.attractors = this.attractors.filter(attractor => attractor.update());
    }

    draw() {
        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw particles
        this.particles.forEach(particle => {
            particle.draw(this.ctx, this.settings.colorMode);
        });

        // Draw attractors
        this.attractors.forEach(attractor => {
            attractor.draw(this.ctx);
        });

        // Draw connections between nearby particles
        this.drawConnections();
    }

    drawConnections() {
        this.ctx.save();
        this.ctx.globalAlpha = 0.1;
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.lineWidth = 0.5;

        for (let i = 0; i < this.particles.length; i += 5) { // Sample every 5th particle for performance
            const particle = this.particles[i];
            for (let j = i + 5; j < this.particles.length; j += 5) {
                const other = this.particles[j];
                const distance = Math.sqrt(
                    (particle.x - other.x) ** 2 + (particle.y - other.y) ** 2
                );

                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                }
            }
        }
        this.ctx.restore();
    }

    animate() {
        if (!this.isRunning) return;

        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}

// Initialize the galaxy
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('galaxyCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create galaxy
    const galaxy = new Galaxy(canvas, ctx);

    // Add some initial attractors for visual appeal
    setTimeout(() => {
        galaxy.attractors.push(new Attractor(canvas.width * 0.3, canvas.height * 0.3));
        galaxy.attractors.push(new Attractor(canvas.width * 0.7, canvas.height * 0.7));
    }, 1000);
});