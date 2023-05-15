const onloadFunction = () => {
  let imageIDs = [
    "redirect-to-play-game-image-btn-1",
    "redirect-to-play-game-image-btn-2",
    "redirect-to-play-game-image-btn-3",
  ];

  for (let i = 1; i <= imageIDs.length; i++) {
    // First get the image height and width in a let
    let element = document.getElementById(imageIDs[i - 1]);
    let positionInfo = element.getBoundingClientRect();
    let imgHeight = positionInfo.height;
    let imgWidth = positionInfo.width;

    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    let imgLeft = Math.floor(Math.random() * (screenWidth - imgWidth));
    let imgTop = Math.floor(Math.random() * (screenHeight - imgHeight));

    document.getElementById(imageIDs[i - 1]).style.top = imgTop + "px";
    document.getElementById(imageIDs[i - 1]).style.left = imgLeft + "px";
  }
};

// toggles claslist to dispaly contnent in animcation for yoda words game

yodaGameSpan = document.querySelector(".redirect-to-play-game-image-btn-1");
yodaGrid = document.querySelector(".yoda-words-game-grid");
yodaGameSpan.addEventListener("click", () => {
  yodaGrid.classList.toggle("active");
});

// Yoda Game JS

const yodaWords = "Doing great young padawan, you are!";
btnFinishYoda = document.querySelector(".button-end-yoda-game");
yodaFinishedLock = document.querySelector(".yoda-lock-1");
yodacloseicon = document.querySelector(".yoda-close");
var img = document.createElement("img");
var src = document.getElementById("yoda-pic-1");

img.setAttribute("class", "yoda-img");
img.src = "assets/images/yoda-thumb-up.png";
src.appendChild(img);

var words = yodaWords.split(" ");

random = words.sort(() => Math.floor(Math.random() * Math.floor(1)) - 1);

for (let i = 0; i < random.length; i++) {
  let newWord = document.createElement("span");
  newWord.setAttribute("class", "yoda-wrong-words");
  newWord.textContent = random[i];
  document.getElementById("yoda-words-wrong").appendChild(newWord);
}

let button = document.querySelector("#submit");
button.addEventListener("click", () => {
  let answer = document.getElementById("answer").value;
  console.log(answer);
  if (answer === yodaWords) {
    alert("Congratulation Young One");
    btnFinishYoda.classList.toggle("finished");
  } else alert("Wrong answer, try again");
});

btnFinishYoda.addEventListener("click", () => {
  yodaFinishedLock.classList.toggle("yoda-lock-change-color");
  yodaGrid.classList.toggle("active");
});

yodacloseicon.addEventListener("click", () => {
  yodaGrid.classList.toggle("active");
});

// End Yoda Game JS

// maul whack a maul game
maulGrid = document.querySelector(".whac-a-maul-grid");
maulBtnOpen = document.querySelector(".redirect-to-play-game-image-btn-2");
maulBtnClose = document.querySelector(".maul-close");
maulBtnEndGamePass = document.querySelector(".btn-whack-a-maul-end");
// maulBtnEndGameFail = document.querySelector(".btn-whack-a-maul-end-fail");
maulLockIcon = document.querySelector(".maul-lock-2");

maulBtnOpen.addEventListener("click", () => {
  maulGrid.classList.toggle("active");
});

maulBtnClose.addEventListener("click", () => {
  maulGrid.classList.toggle("active");
});

maulBtnEndGamePass.addEventListener("click", () => {
  maulLockIcon.classList.toggle("maul-lock-change-color");
  maulGrid.classList.toggle("active");
});

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
}

function displayLoseModal() {
  loseModal.style.display = "block";
  loseModal.focus();
  repeatBtn.addEventListener("click", retryGame);
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
