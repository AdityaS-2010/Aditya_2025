// To build GameLevels, each contains GameObjects from below imports
import GameEnv from './GameEnv.js';
import Background from './Background.js';
import PlayerOne from './PlayerOne.js';
import PlayerTwo from './PlayerTwo.js';
import NPC from './NPC.js';
//import Goomba from './EnemyGoomba.js';
//import Coin from './Coin.js';


class GameLevelWater {
  constructor(path) {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Values dependent on GameEnv.create()
    let width = GameEnv.innerWidth;
    let height = GameEnv.innerHeight;

    // Background data
    const image_src_castle = path + "/images/rpg/castle.png";
    const image_data_castle = {
        name: 'castle',
        src: image_src_castle,
        pixels: {height: 720, width: 1280}
    };

    // Player 1 sprite data (turtle)
    const MAIN_SCALE_FACTOR = 16;
    const sprite_src_main = path + "/images/rpg/main.png";
    const sprite_data_main = {
        name: 'main',
        src: sprite_src_main,
        SCALE_FACTOR: MAIN_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height/MAIN_SCALE_FACTOR) }, 
        pixels: {height: 280, width: 256},
        orientation: {rows: 4, columns: 3 },
        up: { start: 0, row: 0, columns: 3 },     // Row 3, 3 frames for "up" animation
        down: { start: 0, row: 2, columns: 3 },  // Row 0, 3 frames for "down" animation
        left: { start: 0, row: 3, columns: 3 },  // Row 1, 3 frames for "left" animation
        right: { start: 0, row: 1, columns: 3 } // Row 2, 3 frames for "right" animation
    };

   // Player 2 sprite data (skeleton)
    const sprite_src_skeleton = path + "/images/rpg/skeleton.png";
    const sprite_data_skeleton = {
        name: 'skeleton',
        src: sprite_src_skeleton,
        SCALE_FACTOR: 15,               // Scale the sprite by this factor
        STEP_FACTOR: 400,               // Speed or step factor for movement
        ANIMATION_RATE: 50,             // Rate of animation
        pixels: { height: 240, width: 129 }, // Size of each frame (height and width)
        INIT_POSITION: { x: 0, y: 0 },  // Initial position on the canvas or grid
        orientation: { rows: 4, columns: 3 }, // Sprite sheet layout: 4 rows, 3 columns
        down: { row: 3, start: 0, columns: 3 },  // 4th row (index 3) for downward movement
        left: { row: 2, start: 0, columns: 3 },  // 3rd row (index 2) for left movement
        right: { row: 1, start: 0, columns: 3 }, // 2nd row (index 1) for right movement
        up: { row: 0, start: 0, columns: 3 }     // 1st row (index 0) for upward movement
    };



    // NPC sprite data (frog)
    const sprite_src_knight = path + "/images/rpg/npc.png";
    const sprite_data_knight = {
        name: 'knight',
        src: sprite_src_knight,
        SCALE_FACTOR: 9,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 0,
        pixels: {height: 250, width: 129},
        INIT_POSITION: { x: (width / 2), y: (height / 2)}, 
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1 },  // This is the stationary npc, down is default
    };

    // List of objects defnitions for this level
    this.objects = [
      { class: Background, data: image_data_castle },
      { class: PlayerOne, data: sprite_data_main },
      { class: PlayerTwo, data: sprite_data_skeleton },
      { class: NPC, data: sprite_data_knight }
    ];
  }

}

export default GameLevelWater;
