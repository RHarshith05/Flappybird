"use strict";

var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// loading the required images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// Declaring variables
var gap = 120; //It determines the gap between the pipes 
var constant;
var bX = 10;//Determines at what x coordinate the bird starts at the start of the game
var bY = 150;//Determines at what x coordinate the bird starts at the start of the game
var gravity = 1;//Determines the pull towards which the bird comes down 
var score = 0;//Calculates the score 

// Adding audio files for flying and scoring 
var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// Declaring how the moves of the bird
document.addEventListener("keydown", moveUp);


function moveUp() {
  bY -= 25;
  fly.play();
}

// Declaring where the pipes will be located 
var pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0,
};

// Designing how the game functions 
function draw() {
  ctx.drawImage(bg, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
    constant = pipeNorth.height + gap;
    
    //Adding the pipes to the canvas
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height,
      });
    }

    // detect collision
    if (
      (bX + bird.width >= pipe[i].x &&
        bX <= pipe[i].x + pipeNorth.width &&
        (bY <= pipe[i].y + pipeNorth.height ||
          bY + bird.height >= pipe[i].y + constant)) ||
      bY + bird.height >= cvs.height - fg.height
    ) {
      location.reload(); // reload the page
    }

    if (pipe[i].x == 5) { //if the pipe reaches the left end of the page it shows that the bird crossed it succesfully thus the score is increased
      score++;
      scor.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, bX, bY);

  bY += gravity;
  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score : " + score, 10, cvs.height - 20);
  requestAnimationFrame(draw);
}

draw();
