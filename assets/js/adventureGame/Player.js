import GameEnv from './GameEnv.js';
import Character from './Character.js';

// Define non-mutable constants as defaults
const SCALE_FACTOR = 25; // 1/nth of the height of the canvas
const STEP_FACTOR = 100; // 1/nth, or N steps up and across the canvas
const ANIMATION_RATE = 1; // 1/nth of the frame rate
const INIT_POSITION = { x: 0, y: 0 };

// Define the speed constant
const SPEED = 6; // character speed

/**
 * Player is a dynamic class that manages the data and events for objects like a player 
 * 
 * This class uses a classic Java class pattern which is nice for managing object data and events.
 * 
 * @method bindEventListeners - Binds key event listeners to handle object movement.
 * @method handleKeyDown - Handles key down events to change the object's velocity.
 * @method handleKeyUp - Handles key up events to stop the object's velocity.
 */
class Player extends Character {
    /**
     * The constructor method is called when a new Player object is created.
     * 
     * @param {Object|null} data - The sprite data for the object. If null, a default red square is used.
     */
    constructor(data = null) {
        super(data);
        this.keypress = data?.keypress || {up: 87, left: 65, down: 83, right: 68};
        this.velocity = { x: 0, y: 0 };
        this.keysPressed = {}; // Initialize keysPressed
        this.idleFrameIndex = 0; // Initialize idle frame index
        this.idleFrameCounter = 0; // Initialize idle frame counter

        // Add event listeners for keydown and keyup
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown({ keyCode }) {
        this.keysPressed[keyCode] = true; // Track key press state
        switch (keyCode) {
            case this.keypress.up:
                this.velocity.y = -SPEED;
                this.direction = 'up';
                break;
            case this.keypress.left:
                this.velocity.x = -SPEED;
                this.direction = 'left';
                break;
            case this.keypress.down:
                this.velocity.y = SPEED;
                this.direction = 'down';
                break;
            case this.keypress.right:
                this.velocity.x = SPEED;
                this.direction = 'right';
                break;
        }
        console.log('Key down:', keyCode, 'Velocity:', this.velocity);
    }

    /**
     * Handles key up events to stop the player's velocity.
     * 
     * This method stops the player's velocity based on the key released.
     * 
     * @param {Object} event - The keyup event object.
     */
    handleKeyUp({ keyCode }) {
        this.keysPressed[keyCode] = false; // Track key release state
        switch (keyCode) {
            case this.keypress.up:
            case this.keypress.down:
                this.velocity.y = 0;
                break;
            case this.keypress.left:
            case this.keypress.right:
                this.velocity.x = 0;
                break;
        }
        console.log('Key up:', keyCode, 'Velocity:', this.velocity);
    }

    /**
     * Draws the object on the canvas.
     * 
     * This method renders the object using the sprite sheet if provided, otherwise a red square.
     */
    draw() {
        if (this.spriteSheet) {
            // Sprite Sheet frame size: pixels = total pixels / total frames
            const frameWidth = this.spriteData.pixels.width / this.spriteData.orientation.columns;
            const frameHeight = this.spriteData.pixels.height / this.spriteData.orientation.rows;
    
            // Sprite Sheet direction data source (e.g., front, left, right, back)
            const directionData = this.spriteData[this.direction];
    
            // Sprite Sheet x and y declarations to store coordinates of current frame
            let frameX, frameY;
            // Sprite Sheet x and y current frame: coordinate = (index) * (pixels)
            frameX = (directionData.start + this.frameIndex) * frameWidth;
            frameY = directionData.row * frameHeight;
    
            // Set up the canvas dimensions and styles
            this.canvas.width = frameWidth;
            this.canvas.height = frameHeight;
            this.canvas.style.width = `${this.width}px`;
            this.canvas.style.height = `${this.height}px`;
            this.canvas.style.position = 'absolute';
            this.canvas.style.left = `${this.position.x}px`;
            this.canvas.style.top = `${GameEnv.top + this.position.y}px`;
    
            // Clear the canvas before drawing
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
            // Draw the current frame of the sprite sheet
            this.ctx.drawImage(
                this.spriteSheet,
                frameX, frameY, frameWidth, frameHeight, // Source rectangle
                0, 0, this.canvas.width, this.canvas.height // Destination rectangle
            );
    
            // Update the frame index for animation at a slower rate
            this.frameCounter++;
            if (this.frameCounter % this.animationRate === 0) {
                this.frameIndex = (this.frameIndex + 1) % directionData.columns;
            }
        } else {
            // Draw default red square
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    /**
     * Updates the object's position and ensures it stays within the canvas boundaries.
     * 
     * This method updates the object's position based on its velocity and ensures that the object
     * stays within the boundaries of the canvas.
     */
    update() {
        // Update begins by drawing the object
        this.draw();

        // Perform collision checks
        this.collisionChecks();

        // Update or change position according to velocity events
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Ensure the object stays within the canvas boundaries
        // Bottom of the canvas
        if (this.position.y + this.height > GameEnv.innerHeight) {
            this.position.y = GameEnv.innerHeight - this.height;
            this.velocity.y = 0;
        }
        // Top of the canvas
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
        }
        // Right of the canvas
        if (this.position.x + this.width > GameEnv.innerWidth) {
            this.position.x = GameEnv.innerWidth - this.width;
            this.velocity.x = 0;
        }
        // Left of the canvas
        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x = 0;
        }

        // Handle idle animation when no keys are pressed
        if (!this.keysPressed[this.keypress.up] && !this.keysPressed[this.keypress.left] &&
            !this.keysPressed[this.keypress.down] && !this.keysPressed[this.keypress.right]) {
            this.handleIdleAnimation();
        }
    }

    /**
     * Handles the idle animation when no keys are pressed.
     */
    handleIdleAnimation() {
        // Update the idle frame index for animation at a slower rate
        this.idleFrameCounter++;
        if (this.idleFrameCounter % (this.animationRate * 1) === 0) { // Adjust the rate as needed
            this.idleFrameIndex = (this.idleFrameIndex + 1) % this.spriteData.idle.columns;
        }

        // Draw the idle frame
        const frameWidth = this.spriteData.pixels.width / this.spriteData.orientation.columns;
        const frameHeight = this.spriteData.pixels.height / this.spriteData.orientation.rows;
        const frameX = this.idleFrameIndex * frameWidth;
        const frameY = this.spriteData.idle.row * frameHeight;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(
            this.spriteSheet,
            frameX, frameY, frameWidth, frameHeight, // Source rectangle
            0, 0, this.canvas.width, this.canvas.height // Destination rectangle
        );
    }
}

export default Player;