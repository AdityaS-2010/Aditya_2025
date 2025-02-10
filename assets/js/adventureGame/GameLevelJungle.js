import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Player from './Player.js';

class GameLevelJungle {
    constructor(path) {
        let width = GameEnv.innerWidth;
        let height = GameEnv.innerHeight;

        const image_src_jungle = path + "/images/gamify/Jungle.jpg";
        const image_data_jungle = {
            name: 'Jungle',
            greeting: "Welcome to the Jungle! There are many wonderful animals to meet here, but be careful!",
            src: image_src_jungle,
            pixels: { height: 700, width: 400 }
        };

        const sprite_src_chungy = path + "/images/gamify/chungy.png";
        const CHUNGY_SCALE_FACTOR = 3;
        const sprite_data_chungy = {
            id: 'Chungy',
            greeting: "Hi I am Chungy, I love exploring the jungle and a great adventure!",
            src: sprite_src_chungy,
            SCALE_FACTOR: CHUNGY_SCALE_FACTOR,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 20,
            INIT_POSITION: { x: 0, y: height - (height / CHUNGY_SCALE_FACTOR) },
            pixels: { height: 951, width: 947 },
            orientation: { rows: 12, columns: 12 },
            idle: { row: 4, start: 0, columns: 10 },
            down: { row: 5, start: 6, columns: 11 },
            left: { row: 7, start: 0, columns: 9 },
            right: { row: 0, start: 0, columns: 8  },
            up: { row: 5, start: 0, columns: 5 },
            hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
            keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
        };


        this.objects = [
            { class: Background, data: image_data_jungle },
            { class: Player, data: sprite_data_chungy },
        ];
    }
}

export default GameLevelJungle;