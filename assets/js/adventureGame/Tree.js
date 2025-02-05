import GameEnv from './GameEnv.js';

class Tree {
    constructor(data) {
        this.canvas = document.createElement('canvas');
        this.canvas.id = data.id || "tree";
        this.canvas.width = data.pixels?.width || 0;
        this.canvas.height = data.pixels?.height || 0;
        this.ctx = this.canvas.getContext('2d');
        document.getElementById("gameContainer").appendChild(this.canvas);

        this.position = data.position || { x: 0, y: 0 };
        this.spriteSheet = new Image();
        this.spriteSheet.src = data.src;
        this.spriteSheet.onload = () => {
            this.ready = true;
        };

        this.interactable = data.interactable || false;
        this.interactionKey = data.interactionKey || 'E'; // Default interaction key
    }

    draw() {
        if (!this.ready) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.spriteSheet, 0, 0, this.canvas.width, this.canvas.height);
    }

    update() {
        this.draw();
    }

    interact() {
        if (this.interactable) {
            console.log("Tree interacted with!");
            // Add interaction logic here
        }
    }

    addInteractionListener() {
        document.addEventListener('keydown', (event) => {
            if (event.key === this.interactionKey) {
                this.interact();
            }
        });
    }

    destroy() {
        const index = GameEnv.gameObjects.indexOf(this);
        if (index !== -1) {
            GameEnv.gameObjects.splice(index, 1);
        }
        this.canvas.remove();
    }
}

export default Tree;