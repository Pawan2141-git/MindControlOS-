const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const colors = ["#ff4d88", "#ff6b99", "#ff85aa"];

class Particle {
    constructor(x, y, size, speedX, speedY, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.02;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function createParticles(event) {
    for (let i = 0; i < 5; i++) {
        let x = event.x;
        let y = event.y;
        let size = Math.random() * 5 + 2;
        let speedX = (Math.random() - 0.5) * 2;
        let speedY = (Math.random() - 0.5) * 2;
        let color = colors[Math.floor(Math.random() * colors.length)];
        particlesArray.push(new Particle(x, y, size, speedX, speedY, color));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        if (particlesArray[i].size <= 0.2) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animateParticles);
}

window.addEventListener("mousemove", createParticles);
animateParticles();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Love Question Logic
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const questionBox = document.querySelector(".question-box");
const loveMessage = document.querySelector(".love-message");

yesBtn.addEventListener("click", () => {
    questionBox.style.display = "none";
    loveMessage.style.opacity = "1";
    loveMessage.style.transform = "scale(1)";
});

// No button moves away on hover
noBtn.addEventListener("mouseover", () => {
    const randomX = Math.random() * window.innerWidth * 0.7;
    const randomY = Math.random() * window.innerHeight * 0.7;

    noBtn.style.position = "absolute";
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
});
