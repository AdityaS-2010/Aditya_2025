import Character from './Character.js';
import GameEnv from './GameEnv.js';

class Tree extends Character {
    constructor(data) {
        super(data);
        
        // Basic properties
        this.isChopped = false;
        this.frameIndex = 0;
        this.frameCounter = 0;
        this.spriteData = data;
        
        // Create two separate canvases - one for each animation
        this.idleCanvas = this.canvas;
        this.chopCanvas = document.createElement('canvas');
        this.chopCtx = this.chopCanvas.getContext('2d');
        
        // Load sprite sheet
        this.spriteSheet = new Image();
        this.spriteSheet.src = data.src;
        
        // Set up canvases
        this.spriteSheet.onload = () => {
            const frameWidth = this.spriteData.pixels.width / this.spriteData.orientation.columns;
            const frameHeight = this.spriteData.pixels.height / this.spriteData.orientation.rows;
            
            // Setup idle canvas
            this.idleCanvas.width = frameWidth;
            this.idleCanvas.height = frameHeight;
            this.idleCanvas.style.width = `${this.width}px`;
            this.idleCanvas.style.height = `${this.height}px`;
            this.idleCanvas.style.position = 'absolute';
            this.idleCanvas.style.left = `${this.position.x}px`;
            this.idleCanvas.style.top = `${GameEnv.top + this.position.y}px`;
            
            // Setup chop canvas with same dimensions but initially hidden
            this.chopCanvas.width = frameWidth;
            this.chopCanvas.height = frameHeight;
            this.chopCanvas.style.width = `${this.width}px`;
            this.chopCanvas.style.height = `${this.height}px`;
            this.chopCanvas.style.position = 'absolute';
            this.chopCanvas.style.left = `${this.position.x}px`;
            this.chopCanvas.style.top = `${GameEnv.top + this.position.y}px`;
            this.chopCanvas.style.display = 'none';
            
            // Add chop canvas to the game container
            const container = this.idleCanvas.parentNode;
            if (container) {
                container.appendChild(this.chopCanvas);
            }
            
            // Add to game objects
            if (!GameEnv.gameObjects.includes(this)) {
                GameEnv.gameObjects.push(this);
            }
        };
    }

    // Handle tree chopping
    chopTree() {
        if (!this.isChopped) {
            this.isChopped = true;
            this.frameIndex = 0;
            this.frameCounter = 0;
            
            // Hide idle canvas and show chop canvas
            this.idleCanvas.style.display = 'none';
            this.chopCanvas.style.display = 'block';
        }
    }

    // Draw the tree
    draw() {
        if (this.spriteSheet && this.spriteSheet.complete) {
            const frameWidth = this.spriteData.pixels.width / this.spriteData.orientation.columns;
            const frameHeight = this.spriteData.pixels.height / this.spriteData.orientation.rows;

            // Get animation data
            const animationData = this.isChopped ? this.spriteData.chop : this.spriteData.idle;
            
            // Calculate position in sprite sheet
            const frameX = (animationData.start + this.frameIndex) * frameWidth;
            const frameY = animationData.row * frameHeight;

            // Clear and draw on appropriate canvas
            const currentCanvas = this.isChopped ? this.chopCanvas : this.idleCanvas;
            const currentCtx = this.isChopped ? this.chopCtx : this.ctx;
            
            currentCtx.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
            currentCtx.drawImage(
                this.spriteSheet,
                frameX, frameY, frameWidth, frameHeight,
                0, 0, currentCanvas.width, currentCanvas.height
            );

            // Update animation frame based on animation rate from sprite data
            this.frameCounter++;
            if (this.frameCounter >= this.spriteData.ANIMATION_RATE) {
                if (this.isChopped) {
                    this.frameIndex = Math.min(this.frameIndex + 1, animationData.columns - 1);
                } else {
                    this.frameIndex = (this.frameIndex + 1) % animationData.columns;
                }
                this.frameCounter = 0;
            }
        }
    }

    update() {
        this.draw();
    }
}

export default Tree;
