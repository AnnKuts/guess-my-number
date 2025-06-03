import {
    initGame,
    checkGuess,
    getScore,
    getHighscore,
} from "./game.js";

let state = initGame();

document.querySelector(".highscore").textContent = getHighscore();

const displayMessage = (msg) =>
    (document.querySelector(".message").textContent = msg);

document.querySelector(".check").addEventListener("click", () => {
    const guess = Number(document.querySelector(".guess").value);
    const result = checkGuess(guess);

    switch (result.status) {
        case "no-input":
            displayMessage("⛔️ No number!");
            break;
        case "win":
            document.querySelector("h1").textContent = "My number is";
            document.querySelector(".number").textContent = result.secretNumber;
            displayMessage("🎉 Correct Number!");
            document.body.style.backgroundColor = "#60b347";
            document.querySelector(".number").style.width = "50rem";
            document.querySelector(".highscore").textContent = result.highscore;
            break;
        case "high":
            displayMessage("📈 Too high");
            document.querySelector(".score").textContent = getScore();
            break;
        case "low":
            displayMessage("📉 Too low");
            document.querySelector(".score").textContent = getScore();
            break;
        case "lose":
            displayMessage("😔 You lost!");
            document.body.style.backgroundColor = "#FF0000";
            document.querySelector(".number").style.width = "50rem";
            document.querySelector("h1").textContent = "My number is";
            document.querySelector(".number").textContent = result.secretNumber;
            break;
    }
});

document.querySelector(".again").addEventListener("click", () => {
    state = initGame();
    displayMessage("Start guessing...");
    document.querySelector(".score").textContent = state.score;
    document.querySelector(".number").textContent = "?";
    document.querySelector(".guess").value = "";
    document.body.style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
});
