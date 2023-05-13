document.addEventListener("DOMContentLoaded", () => {
    startButton.addEventListener('click', startGame);
})

const holes = document.getElementsByClassName('hole');
const mauls = document.querySelectorAll('.maul');
const scoreDisplay = document.getElementById('whac-score');
const timer = document.getElementById('whac-timer');
const startButton = document.getElementById('whac-start-btn');

let previousHole;
let timeUp = false;
let timeLimit = 15000;
let score = 0;
let countdown;

function randomiseHole(holes) {
    const randomHole = Math.floor(Math.random() * holes.length);
    const pickedHole = holes[randomHole];
    if (pickedHole === previousHole) {
        return randomiseHole(pickedHole);
    }
    previousHole = pickedHole;
    return pickedHole;
}

function maulUp() {
    const time = Math.random() * 1300 + 600;
    const hole = randomiseHole(holes);
    hole.classList.add('up');
    setTimeout(function(){
        hole.classList.remove('up');
        if (!timeUp) { 
            maulUp();
        }
    }, time);
}


function startGame() {
    countdown = timeLimit/1000;
    scoreDisplay.textContent = 0;
    timer.textContent = countdown;
    timeUp = false;
    score = 0;
    maulUp();
    setTimeout(function(){
        timeUp = true;
    }, timeLimit);

    let startTimer = setInterval(function(){
        countdown -= 1;
        timer.textContent = countdown;
        if (countdown < 0) {
            countdown = 0;
            clearInterval(startTimer);
            timer.textContent = 'Time is up!'
        }
    }, 1000);
}


function whackMaul(e){
    score++;
    this.style.backgroundImage = 'url(../images/maul-cartoon.webp)';
    this.style.pointerEvents = 'none';
    setTimeout(() => {
        this.style.backgroundImage = 'url(../images/maul-cartoon.webp)';
        this.style.pointerEvents = 'all';
    }, 800);
    scoreDisplay.textContent = score;
}
mauls.forEach(maul => maul.addEventListener('click', whackMaul));
