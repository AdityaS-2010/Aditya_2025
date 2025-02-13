import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';

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

        const sprite_src_lumberjack = path + "/images/gamify/lumberjack.png";
        const LUMBERJACK_SCALE_FACTOR = 3;
        const sprite_data_lumberjack = {
            id: 'Lumberjack',
            greeting: "Hi I am Lumberjack, I love chopping wood and exploring the jungle!",
            src: sprite_src_lumberjack,
            SCALE_FACTOR: LUMBERJACK_SCALE_FACTOR,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: width - (width / 4), y: height - (height / LUMBERJACK_SCALE_FACTOR) },
            pixels: { height: 348, width: 348 },
            orientation: { rows: 6, columns: 6 },
            idle: { row: 0, start: 0, columns: 4 },
            down: { row: 0, start: 0, columns: 3 },
            left: { row: 2, start: 0, columns: 6 },
            right: { row: 2, start: 0, columns: 6 },
            up: { row: 4, start: 0, columns: 6 },
            hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
            keypress: { up: 87, left: 65, down: 83, right: 68 }, // W, A, S, D
            quiz: {
                title: "What should I do?",
                questions: [
                    "Should I chop this tree?\n1. Yes\n2. No",
                ]
            }
        };

        this.objects = [
            { class: Background, data: image_data_jungle },
            { class: Player, data: sprite_data_chungy },
            { class: Npc, data: sprite_data_lumberjack }
        ];

        // Add event listener for handling the lumberjack's quiz
        window.addEventListener('keydown', this.handleLumberjackQuiz.bind(this));
    }

    handleLumberjackQuiz(event) {
        if (event.key === 'e' || event.key === 'u') {
            const lumberjack = this.objects.find(obj => obj.data.id === 'Lumberjack');
            if (lumberjack) {
                const question = lumberjack.data.quiz.questions[0];
                const answer = prompt(`${lumberjack.data.quiz.title}\n${question}`);
                if (answer === '1') {
                    alert("The tree was chopped down!");
                } else if (answer === '2') {
                    alert("The tree was not chopped down.");
                } else {
                    alert("Invalid response. Please answer with 1 or 2.");
                }
            }
        }
    }
}

export default GameLevelJungle;




