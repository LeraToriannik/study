"use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayGuessMessage = function (message) {
  document.querySelector(".guess-message").textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
  const guessingNumber = +document.querySelector(".number-input").value;

  //No input
  if (!guessingNumber) {
    //document.querySelector(".guess-message").textContent = "Введите число!";
    displayGuessMessage("Введите число!");

    // Player won
  } else if (guessingNumber === secretNumber) {
    //document.querySelector(".guess-message").textContent = "Правильно!";
    displayGuessMessage("Правильно!");
    document.querySelector("body").style.backgroundColor = "rgb(9, 250, 21)";
    document.querySelector(".question").style.width = "800px";
    document.querySelector(".question").textContent = secretNumber;
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
    //Number from input is wrong
  } else if (guessingNumber !== secretNumber) {
    if (score > 1) {
      //document.querySelector(".guess-message").textContent = guessingNumber > secretNumber ? "Слишком много!" : "Слишком мало!";
      displayGuessMessage(
        guessingNumber > secretNumber ? "Слишком много!" : "Слишком мало!"
      );
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      //document.querySelector(".guess-message").textContent = "Game over!";
      displayGuessMessage("Game over!");
      document.querySelector(".score").textContent = 0;
    }
  }
});

// Again
document.querySelector(".again").addEventListener("click", function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector(".question").textContent = "???";
  document.querySelector(".question").style.width = "400px";
  document.querySelector("body").style.backgroundColor = "rgb(0, 0, 0)";
  //document.querySelector(".guess-message").textContent = "Начни угадывать!";
  displayGuessMessage("Начни угадывать!");
  document.querySelector(".score").textContent = score;
  document.querySelector(".number-input").value = "";
});
