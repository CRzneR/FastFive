"use strict";

let firstSelected = document.getElementById("imageContainer6");
let score = 0;
let gameOver = false;
const images = [
  "Enton.png",
  "gengar.png",
  "pikatchu.png",
  "pumeluff.png",
  "relaxo.png",
  "shiggy.png",
];

// Funktion für Overlay für Regeln schließen
function closeOverlay() {
  document.getElementById("rules").style.display = "none";
}

// Beim Start drücken = Spiel beginn
document.getElementById("rules").addEventListener("click", function () {
  closeOverlay();
  resetTimer();
  startTimer();
});

// Zufällige Bilder setzen
function setRandomImages() {
  let shuffledImages = [...images].sort(() => Math.random() - 0.5);
  for (let i = 1; i <= 6; i++) {
    document.getElementById(`imageContainer${i}`).innerHTML = `<img src="${
      shuffledImages[i - 1]
    }" alt="Random Image">`;
  }
}

// Vergleichen
function selectImage(element) {
  const img1 = firstSelected.querySelector("img").src.split("/").pop();
  const img2 = element.querySelector("img").src.split("/").pop();

  const containerRightAnswer = document.getElementById("containerRightAnswer");
  const containerWrongAnswer = document.getElementById("containerWrongAnswer");

  if (img1 === img2) {
    score++;
    document.getElementById("score").textContent = score;
    stopTimer();
    containerRightAnswer.style.display = "block";
    checkGameOver();
  } else {
    containerWrongAnswer.style.display = "block";
    setTimeout(() => {
      containerWrongAnswer.style.display = "none";
    }, 3000);
  }
}

function refreshSelection() {
  const containerRightAnswer = document.getElementById("containerRightAnswer");
  containerRightAnswer.style.display = "none";
  startTimer();
  setRandomImages();
}

function startCountdown(callback) {
  let count = 3;
  const zeitstrafe = document.getElementById("zeitStrafe");
  zeitstrafe.textContent = count;

  const countdown = setInterval(() => {
    count--;
    overlay.textContent = count;
    if (count < 0) {
      clearInterval(countdown);
      startTimer();
      setRandomImages();
      overlay.style.display = "none";
      if (callback) callback();
    }
  }, 1000);
}

// GameOver

function checkGameOver() {
  if (score >= 5) {
    gameOver = true;
    stopTimer();

    const gameOverOverlay = document.getElementById("gameOverOverlay");
    gameOverOverlay.style.display = "block";
  }
}

document.getElementById("restartButton").addEventListener("click", function () {
  reloadPage();
});

function reloadPage() {
  location.reload();
}

// Time

let startTime;
let interval;
let elapsed = 0;
let running = false;

function startTimer() {
  if (gameOver || running) return;

  startTime = performance.now() - -elapsed;
  interval = setInterval(updateTimer, 10);
  running = false;
}

function stopTimer() {
  if (running) {
    clearInterval(interval);
    elapsed = performance.now() - startTime;
    running = false;
  }
}

function resetTimer() {
  clearInterval(interval);
  document.getElementById("timer").innerText = "0.000 s";
  startTime = 0;
  elapsed = 0;
  running = false;
}

function updateTimer() {
  const currentTime = performance.now();
  const totalTime = (currentTime - startTime) / 1000;
  let elapsedTime = (performance.now() - startTime) / 1000;
  document.getElementById("timer").innerText = elapsedTime.toFixed(3) + " s";
}
