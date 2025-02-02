import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Player from './Player.js';


class GameLevelJungle {
    constructor(path) {
        // Values dependent on GameEnv.create()
        
        let height = GameEnv.innerHeight;

        // Background data
        const image_src_jungle = path + "/images/gamify/Jungle.png"; // be sure to include the path
        const image_data_jungle = {
            name: 'Jungle',
            greeting: "Welcome to the Jungle! There are many wonderful animals to meet here, but be careful!",
            src: image_src_jungle,
            pixels: { height: 700, width: 400 }
        };

        // Player data for Lumberjack
        const sprite_src_lumberjack = path + "/images/gamify/lumberjack.png"; // be sure to include the path
        const LUMBERJACK_SCALE_FACTOR = 5;
        const sprite_data_lumberjack = {
            id: 'Lumberjack',
            greeting: "Hi I am Lumberjack, I love exploring the jungle and a great adventure!",
            src: sprite_src_lumberjack,
            SCALE_FACTOR: LUMBERJACK_SCALE_FACTOR,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 0, y: height - (height / LUMBERJACK_SCALE_FACTOR) },
            pixels: { height: 348, width: 348 },
            orientation: { rows: 5, columns: 5 },
            idle: { row: 0, start: 0, columns: 4 },
            down: { row: 0, start: 0, columns: 3 },
            left: { row: 2, start: 0, columns: 3 },
            right: { row: 2, start: 0, columns: 5 },
            up: { row: 3, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
            keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
        };

        // List of objects definitions for this level
        this.objects = [
            { class: Background, data: image_data_jungle },
            { class: Player, data: sprite_data_lumberjack },
            // Add NPCs here if needed
        ];
    }
}

export default GameLevelJungle;