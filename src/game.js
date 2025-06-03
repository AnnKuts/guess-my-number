let secretNumber;
let score = 20;
let highscore = localStorage.getItem("highscore") || 0;

function initGame() {
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    score = 20;
    return {
        secretNumber,
        score,
        highscore,
    };
}

function checkGuess(guess) {
    if (!guess) {
        return {status: "no-input"};
    }

    if (guess === secretNumber) {
        if (score > highscore) {
            highscore = score;
            localStorage.setItem("highscore", highscore);
        }
        return {
            status: "win",
            secretNumber,
            score,
            highscore,
        };
    }

    score--;

    if (score < 1) {
        return {
            status: "lose",
            secretNumber,
        };
    }

    return {
        status: guess > secretNumber ? "high" : "low",
        score,
    };
}

function getScore() {
    return score;
}

function getHighscore() {
    return highscore;
}

export {getHighscore, getScore, initGame, checkGuess};