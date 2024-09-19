---
layout: post
title: About
permalink: /about/
---

Creator of Student 2025

<style>
    /* Style looks pretty compact, trace grid-container and grid-item in the code */
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Dynamic columns */
        gap: 10px;
    }
    .grid-item {
        text-align: center;
    }
    .grid-item img {
        width: 100%;
        height: 100px; /* Fixed height for uniformity */
        object-fit: contain; /* Ensure the image fits within the fixed height */
    }
    .grid-item p {
        margin: 5px 0; /* Add some margin for spacing */
    }
</style>

<!-- This grid_container class is for the CSS styling, the id is for JavaScript connection -->
<div class="grid-container" id="grid_container">
    <!-- content will be added here by JavaScript -->
</div>

<script>
    // 1. Make a connection to the HTML container defined in the HTML div
    var container = document.getElementById("grid_container"); // This container connects to the HTML div

    // 2. Define a JavaScript object for our http source and our data rows for the Living in the World grid
    var http_source = "https://upload.wikimedia.org/wikipedia/commons/";
    var living_in_the_world = [
        {"flag": "a/a0/Flag_of_India_%283-5%29.svg", "description": "My family is originated from India"},
        {"flag": "f/f3/Flag_of_Switzerland.svg", "description": "I went to vacation in Switzerland and loved it"},
        {"flag": "0/01/Flag_of_California.svg", "description": "Born in San Diego California"},
        {"flag": "a/a4/Flag_of_the_United_States.svg", "description": "Born and raised in the US"},
    ]; 
    
    // 3a. Consider how to update style count for size of container
    // The grid-template-columns has been defined as dynamic with auto-fill and minmax

    // 3b. Build grid items inside of our container for each row of data
    for (const location of living_in_the_world) {
        // Create a "div" with "class grid-item" for each row
        var gridItem = document.createElement("div");
        gridItem.className = "grid-item";  // This class name connects the gridItem to the CSS style elements
        // Add "img" HTML tag for the flag
        var img = document.createElement("img");
        img.src = http_source + location.flag; // concatenate the source and flag
        img.alt = location.flag + " Flag"; // add alt text for accessibility

        // Add "p" HTML tag for the description
        var description = document.createElement("p");
        description.textContent = location.description; // extract the description

        // Add "p" HTML tag for the greeting
        var greeting = document.createElement("p");
        greeting.textContent = location.greeting;  // extract the greeting

        // Append img and p HTML tags to the grid item DIV
        gridItem.appendChild(img);
        gridItem.appendChild(description);
        gridItem.appendChild(greeting);

        // Append the grid item DIV to the container DIV
        container.appendChild(gridItem);
    }
</script>

### Journey through Life

Here is what I did at those places

- Born in La Jolla and lived there for 6 years
- 🎓 Went to Mission Bay Montessori Academy till first grade, then went to Torrey Pines Elementary
- Moved to 4s Ranch in November 2016
- 🎓 Went to Stone Ranch Elementary since 1st Grade, then went to Oak Valley Middle School, Graduating Del Norte 2028


### Culture, Family, and Fun

Everything for me, as for many others, revolves around Family.

- Both my parents were born in India, but my dad moved to Texas, and later my mom joined him. They later moved to San Diego where I was born.
- My immediate family is pretty small, only consisting of my parents and me. I have 3 first cousins, one on my dad's side, and two on my mom's side.
- For fun, I like to play sports and excercise. I play soccer competetively and I also play basketball sometimes. For excercise I like to go on runs, and workout at home.


<a href="https://adityas-2010.github.io/Aditya_2025/"
style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007BFF; text-align: center; text-decoration: none; border-radius: 5px; transition: background-color 0.3s;">
Go to Home Page
</a>

<!-- from https://github.com/utterance/utterances -->
<script src="https://utteranc.es/client.js"
        repo="AdityaS-2010/Aditya_2025"
        issue-term="title"
        label="blogpost-comment"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
