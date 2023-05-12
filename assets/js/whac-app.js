const holes = document.getElementsByClassName('hole');
const mauls = document.getElementsByClassName('maul');
const scoreDisplay = document.getElementsByClassName('whac-score');
const timer = document.getElementsByClassName('whac-timer');
const startButton = document.getElementsByClassName('whac-start-btn');

let finalHole;
let timeUp = false;
let timeLimit = 30000;
let score = 0;
let countdown;


