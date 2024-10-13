---
layout: base
title: RPG
permalink: /rpg/
---

<canvas id='gameCanvas'></canvas>

<script type="module">
    import GameControl from '{{site.baseurl}}/assets/js/rpg/GameControl.js';

    // Background data
    const image_src = "{{site.baseurl}}/images/rpg/water.png";
    const image_data = {
        pixels: {height: 580, width: 1038}
    };
    const image = {src: image_src, data: image_data};

    // Sprite data
    const sprite_src = "{{site.baseurl}}/images/rpg/turtle.png";
    const sprite_data = {
        SCALE_FACTOR: 10,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        pixels: {height: 280, width: 256},
        orientation: {rows: 4, columns: 3 },
        up: { start: 0, row: 0, columns: 3 },     // Row 3, 3 frames for "up" animation
        down: { start: 0, row: 2, columns: 3 },  // Row 0, 3 frames for "down" animation
        left: { start: 0, row: 3, columns: 3 },  // Row 1, 3 frames for "left" animation
        right: { start: 0, row: 1, columns: 3 } // Row 2, 3 frames for "right" animation

    }; 
    
    const sprite = {src: sprite_src, data: sprite_data};

    // Assets for game
    //const assets = {}
    //const assets = {image: image}
    //const assets = {sprite: sprite}
    const assets = {image: image, sprite: sprite}

    // Get the canvas element and set up the 2D rendering context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Create a new Image object
const npcImage = new Image();

// Set the source of the image
npcImage.src = 'images/rpg/warrior.png';

// When the image loads, draw it on the canvas
npcImage.onload = function() {
    // Draw the NPC at position (x, y) with specified width and height
    const x = 100; // X-coordinate
    const y = 150; // Y-coordinate
    const width = 64; // Width of the image
    const height = 64; // Height of the image
    ctx.drawImage(npcImage, x, y, width, height);
};

    // Start game engine
    GameControl.start(assets);
    
