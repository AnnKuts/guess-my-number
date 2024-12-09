"use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = localStorage.getItem("highscore");
document.querySelector(".highscore").textContent = highscore;

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  //no input
  if (!guess) {
    displayMessage("⛔️ No number!");
    //player wins
  } else if (guess === secretNumber) {
    document.querySelector("h1").textContent = "My number is";
    document.querySelector(".number").textContent = secretNumber;
    displayMessage("🎉 Correct Number!");
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "50rem";

    if (score > highscore) {
      highscore = score;
      localStorage.setItem("highscore", highscore);
      document.querySelector(".highscore").textContent = highscore;
    }
    //when guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈 Too high" : "📉 Too low");
      score--;
      document.querySelector(".score").textContent = score;
    }
    //player lost
    else {
      displayMessage("😔 You lost!");
      document.querySelector("body").style.backgroundColor = "#FF0000";
      document.querySelector(".number").style.width = "50rem";
      document.querySelector("h1").textContent = "My number is";
      document.querySelector(".number").textContent = secretNumber;
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  displayMessage("Start guessing...");
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
