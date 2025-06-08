import {
    initGame,
    checkGuess,
    getScore,
    getHighscore,
} from "./game.js";

import { queue } from "./queue.js";

let state = initGame();
const history = queue();

document.querySelector(".highscore").textContent = getHighscore();

const displayMessage = (msg) =>
    (document.querySelector(".message").textContent = msg);

const showStats = () => {
    const best = history.peek("highest");
    const worst = history.peek("lowest");
    const oldest = history.peek("oldest");
    const newest = history.peek("newest");

    document.getElementById("best-guess").textContent =
        best ? `${best.value} (diff ${best.priority})` : "—";
    document.getElementById("worst-guess").textContent =
        worst ? `${worst.value} (diff ${worst.priority})` : "—";
    document.getElementById("oldest-guess").textContent =
        oldest ? `${oldest.value}` : "—";
    document.getElementById("newest-guess").textContent =
        newest ? `${newest.value}` : "—";

    document.getElementById("stats-modal").classList.remove("hidden");
};

document.querySelector(".check").addEventListener("click", () => {
    const guess = Number(document.querySelector(".guess").value);

    const diff = Math.abs(guess - state.secretNumber);

    history.enqueue(guess, diff);
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
            showStats();
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
            showStats();
            break;
    }
});

document.querySelector(".again").addEventListener("click", () => {
    history.clear();
    state = initGame();
    displayMessage("Start guessing...");
    document.getElementById("stats-modal").classList.add("hidden");
    document.querySelector(".score").textContent = state.score;
    document.querySelector(".number").textContent = "?";
    document.querySelector(".guess").value = "";
    document.body.style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
});

document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("stats-modal").classList.add("hidden");
});
