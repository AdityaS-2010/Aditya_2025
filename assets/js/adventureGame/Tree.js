import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';

class Tree extends GameObject {
    constructor(data) {
        super();
        this.state = {
            ...this.state,
            animation: 'idle',
            direction: 'idle',
            isChopped: false,
        };

        // Create tree element
        this.createTreeElement(data);

        // Set initial object properties
        this.position = data.INIT_POSITION || { x: 0, y: 0 };
        this.scaleFactor = data.SCALE_FACTOR || 3;
        this.animationRate = data.ANIMATION_RATE || 20;
        this.spriteSheet = new Image();
        this.spriteSheet.src = data.src;
        this.spriteData = data;
        this.frameIndex = 0;
        this.frameCounter = 0;

        // Initialize the object's scale based on the game environment
        this.scale = { width: GameEnv.innerWidth, height: GameEnv.innerHeight };

        // Add this object to the gameLoop
        GameEnv.gameObjects.push(this);

        // Set the initial size of the object
        this.resize();
    }

    createTreeElement(data) {
        this.treeElement = document.createElement("div");
        this.treeElement.id = data.id || "tree";
        this.treeElement.style.position = 'absolute';
        this.treeElement.style.backgroundImage = `url(${data.src})`;
        this.treeElement.style.backgroundSize = `${data.pixels.width}px ${data.pixels.height}px`;
        document.getElementById("gameContainer").appendChild(this.treeElement);
    }

    draw() {
        const frameWidth = this.spriteData.pixels.width / this.spriteData.orientation.columns;
        const frameHeight = this.spriteData.pixels.height / this.spriteData.orientation.rows;
        const directionData = this.spriteData[this.state.direction];
        const frameX = (directionData.start + this.frameIndex) * frameWidth;
        const frameY = directionData.row * frameHeight;

        this.treeElement.style.width = `${frameWidth}px`;
        this.treeElement.style.height = `${frameHeight}px`;
        this.treeElement.style.left = `${this.position.x}px`;
        this.treeElement.style.top = `${GameEnv.top + this.position.y}px`;
        this.treeElement.style.backgroundPosition = `-${frameX}px -${frameY}px`;

        this.frameCounter++;
        if (this.frameCounter % this.animationRate === 0) {
            this.frameIndex++;
            if (this.frameIndex >= directionData.columns) {
                this.frameIndex = 0;
                if (directionData.nextRow !== undefined) {
                    directionData.row = directionData.nextRow;
                }
            }
        }
    }

    update() {
        this.draw();
    }

    chopTree() {
        if (!this.state.isChopped) {
            this.state.isChopped = true;
            this.startChopAnimation();
        }
    }

    startChopAnimation() {
        // Set the direction to chop and reset frame index
        this.state.direction = 'chop';
        this.frameIndex = 0;
        this.frameCounter = 0;
        this.animationRate = 10; // Slower animation rate

        // Redraw the tree with the chop animation
        this.update();
    }

    resize() {
        const newScale = { width: GameEnv.innerWidth, height: GameEnv.innerHeight };
        this.position.x = (this.position.x / this.scale.width) * newScale.width;
        this.position.y = (this.position.y / this.scale.height) * newScale.height;
        this.scale = newScale;
        this.size = this.scale.height / this.scaleFactor;
        this.width = this.size;
        this.height = this.size;
    }

    destroy() {
        const index = GameEnv.gameObjects.indexOf(this);
        if (index !== -1) {
            this.treeElement.parentNode.removeChild(this.treeElement);
            GameEnv.gameObjects.splice(index, 1);
        }
    }
}

export default Tree;