// Get the canvas and its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Define the ship objects
class Ship {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.size = 20;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Change direction randomly
        if (Math.random() < 0.05) {
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
        }

        // Keep the ship inside the canvas
        if (this.x < 0 || this.x > canvas.width - this.size) {
            this.speedX *= -1;
        }
        if (this.y < 0 || this.y > canvas.height - this.size) {
            this.speedY *= -1;
        }
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// Create two ships
const ship1 = new Ship(100, 100);
const ship2 = new Ship(500, 500);

// Animation loop
function animate() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ship1.update();
    ship2.update();

    // Make ships circle each other
    const dx = ship2.x - ship1.x;
    const dy = ship2.y - ship1.y;
    const angle = Math.atan2(dy, dx);
    ship1.speedX += Math.cos(angle + Math.PI / 2) * 0.01;
    ship1.speedY += Math.sin(angle + Math.PI / 2) * 0.01;
    ship2.speedX -= Math.cos(angle + Math.PI / 2) * 0.01;
    ship2.speedY -= Math.sin(angle + Math.PI / 2) * 0.01;

    ship1.draw();
    ship2.draw();

    requestAnimationFrame(animate);
}

animate();

// Declare winner button click handler
document.getElementById('declare-winner-button').addEventListener('click', () => {
    const distance = Math.sqrt((ship1.x - ship2.x) ** 2 + (ship1.y - ship2.y) ** 2);
    const winner = distance < 50 ? 'Both ships collided!' : (ship1.x < ship2.x ? 'Ship 1' : 'Ship 2');
    alert(`The winner is: ${winner}`);
});
