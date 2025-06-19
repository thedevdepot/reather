// Get the canvas element from the HTML document
const canvas = document.getElementById('canvas');
// Get the 2D drawing context of the canvas
const ctx = canvas.getContext('2d');

// Define the Ship class
class Ship {
    /**
     * Constructor for the Ship class
     * @param {number} x - The initial x-coordinate of the ship
     * @param {number} y - The initial y-coordinate of the ship
     * @param {string} sprite - The URL of the ship's sprite image
     */
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        // Randomly generate speed in both x and y directions
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        // Size of the ship (used for collision detection)
        this.size = 20;
        // Load the ship's sprite image
        this.sprite = new Image();
        this.sprite.src = sprite;
    }

    /**
     * Update the ship's position and speed
     */
    update() {
        // Update the ship's position based on its speed
        this.x += this.speedX;
        this.y += this.speedY;

        // Change direction randomly (5% chance)
        if (Math.random() < 0.05) {
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
        }

        // Keep the ship inside the canvas (bounce off edges)
        if (this.x < 0 || this.x > canvas.width - this.size) {
            this.speedX *= -1;
        }
        if (this.y < 0 || this.y > canvas.height - this.size) {
            this.speedY *= -1;
        }
    }

    /**
     * Draw the ship on the canvas
     */
    draw() {
        // Draw the ship's sprite image
        ctx.drawImage(this.sprite, this.x, this.y, this.size, this.size);
    }
}

// Create two ships with different sprite images
const ship1 = new Ship(100, 100, 'ship1.png');
const ship2 = new Ship(500, 500, 'ship2.png');

// Load the background image
const background = new Image();
background.src = 'background.png';

// Store all images in an array
const images = [ship1.sprite, ship2.sprite, background];
let imagesLoaded = 0;

// Image loading mechanism
images.forEach(image => {
    image.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === images.length) {
            // Start the animation loop after all images are loaded
            animate();
        }
    };
});

// Animation loop
function animate() {
    // Draw the background image
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Update the ships' positions
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

    // Draw the ships
    ship1.draw();
    ship2.draw();

    // Request the next animation frame
    requestAnimationFrame(animate);
}

// Declare winner button click handler
document.getElementById('declare-winner-button').addEventListener('click', () => {
    // Calculate the distance between the two ships
    const distance = Math.sqrt((ship1.x - ship2.x) ** 2 + (ship1.y - ship2.y) ** 2);
    // Determine the winner based on the distance
    const winner = distance < 50 ? 'Both ships collided!' : (ship1.x < ship2.x ? 'Ship 1' : 'Ship 2');
    // Display the winner in an alert box
    alert(`The winner is: ${winner}`);
});
