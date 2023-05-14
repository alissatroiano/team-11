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
    alert("CORRECT! Well done");
    window.location.replace("game.html");
  } else alert("Wrong answer, try again");
});

// End Yoda Game JS
