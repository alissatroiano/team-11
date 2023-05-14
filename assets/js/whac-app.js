document.addEventListener("DOMContentLoaded", () => {
  startButton.disabled = false;
  startButton.addEventListener("click", startGame);
});

const holes = document.getElementsByClassName("hole");
const mauls = document.querySelectorAll(".maul");
const scoreDisplay = document.getElementById("whac-score");
const timer = document.getElementById("whac-timer");
const startButton = document.getElementById("whac-start-btn");
const whacked = document.getElementsByClassName("dead");

let timeUp = false;
let timeLimit = 15000;
let score = 0;
let countdown;

// Modal variables
const winModal = document.getElementById("whac-win-modal");
const loseModal = document.getElementById("whac-lose-modal");
const unlockBtn = document.getElementById("unlock-button");
const repeatBtn = document.getElementById("repeat-button");

// Modal Functions
function displayWinModal() {
  winModal.style.display = "block";
  winModal.focus();
  unlockBtn.addEventListener("click", maulSuccess);
}

function displayLoseModal() {
  loseModal.style.display = "block";
  loseModal.focus();
  repeatBtn.addEventListener("click", retryGame);
}

function maulSuccess() {
  window.location.href = "game.html";
}

function retryGame() {
  loseModal.style.display = "none";
  startButton.disabled = false;
}

function randomiseHole(holes) {
  let previousHole = [];
  // Picks a hole at random, checks this was not the same as the last hole to be picked and returns the random hole
  const randomHole = Math.floor(Math.random() * holes.length);
  const pickedHole = holes[randomHole];
  previousHole.push(pickedHole);
  if (pickedHole === previousHole) {
    return randomiseHole(pickedHole);
  }
  previousHole = pickedHole;
  return pickedHole;
}

function maulUp() {
  // Declares a time window for the period the maul stays visible and makes this random for each pop up
  // Sets timeout to the random 'time' period then removes 'up' class and runs maulUp again until timeUp is true
  const time = Math.floor(Math.random() * 1000 + 700);
  const hole = randomiseHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) maulUp();
  }, time);
}

function startGame() {
  startButton.disabled = true;
  countdown = timeLimit / 1000;
  scoreDisplay.textContent = 0;
  timer.textContent = countdown;
  timeUp = false;
  score = 0;
  maulUp();
  mauls.forEach((maul) => maul.addEventListener("click", whackMaul));
  setTimeout(function () {
    timeUp = true;
  }, timeLimit);

  let startTimer = setInterval(function () {
    countdown -= 1;
    timer.textContent = countdown;
    if (countdown < 0) {
      countdown = 0;
      clearInterval(startTimer);
      timer.textContent = "Time is up!";
      endGame(scoreDisplay);
    }
  }, 1000);
}

function whackMaul() {
  // Increases score when maul whacked
  // Removes pointer event so maul can't be whacked twice
  // After timeout reinstates pointer event
  this.style.pointerEvents = "none";
  score++;
  setTimeout(() => {
    this.style.pointerEvents = "all";
  }, 500);
  scoreDisplay.textContent = score;
  return scoreDisplay;
}

function endGame(scoreDisplay) {
  console.log(scoreDisplay);
  let totalScore = parseInt(document.getElementById("whac-score").innerHTML);
  console.log(totalScore);
  if (totalScore >= 8) {
    displayWinModal();
  } else {
    displayLoseModal();
  }
}
