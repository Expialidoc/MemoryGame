//const gameContainer = document.getElementById("game");
const gameContainer = document.querySelector("#game");
const results = document.querySelector('.results');
const startGameBtn = document.querySelector(".startGameBtn");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let sec = 10, counter = null, numClicks = 0;

startGameBtn.addEventListener('click', start);                                       //startGame.removeEventListener('click', handleCardClick)

function start() {
   if (counter !== null) {
       clearTimeout(counter);
       counter = null;
       sec = 10;
       document.querySelector('.startGameBtn').value = 'Start';
       resetGame();

   } else {
        startGame();
        timer();
        document.querySelector('.startGameBtn').value = 'Reset';
  }
}

function timer() {
  counter = setTimeout(function () {
    sec = sec - .1;
    currTime = sec.toFixed(1);
    document.getElementById("timer").innerHTML = currTime;
    timer();
  }, 100);
  if (sec <= 0) {
    clearTimeout(counter);
    document.querySelector('#timer').textContent = ' You finished!';
    const Score = document.createElement("p");
    Score.className = 'score';
    Score.textContent = `Your score is: ${numClicks} clicked pairs`;
    results.append(Score);

    gameOver();

  }
}

function resetGame() {
  if (document.querySelector('#game') !== null) {
    document.querySelector('#game').innerHTML = ''; //The fastest method to remove children!!!
    document.querySelector('#timer').textContent = '';
    document.querySelector('.score').remove();
    document.querySelector('.startGameBtn').value = 'Start';
    numClicks = 0;
  }

}

function gameOver() {
  if (document.querySelector('#game') !== null) {
    document.querySelector('#game').innerHTML = '';//The fastest method to remove children!!!
  }
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let lenArr = array.length;
  // While there are elements in the array
  while (lenArr > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * lenArr);
    // Decrease counter by 1
    lenArr--;

    // And swap the last element with it
    let temp = array[lenArr];
    array[lenArr] = array[index];
    array[index] = temp;
  }
  console.log(array);
  return array;
}
let shuffledColors = shuffle(COLORS);
let clickedCard = false;
let firstCard, secondCard;
let lockBoard = false;
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick, true);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {

  if (lockBoard) return;
  if (this === firstCard) return;

  e.target.style.backgroundColor = `${e.target.className}`;

  if (!clickedCard) {
    clickedCard = true;
    firstCard = this;

    return;
  }
  secondCard = this;
  numClicks++;
  checkForMatch();
}

function checkForMatch() {
  if (firstCard.className === secondCard.className) {
    disableCards();
    return;
  }

  unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', handleCardClick);
  secondCard.removeEventListener('click', handleCardClick);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.style.backgroundColor = 'transparent';
    secondCard.style.backgroundColor = 'transparent';

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [clickedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}


// when the DOM loads
function startGame() {
  let shuffledColors = shuffle(COLORS);

  createDivsForColors(shuffledColors);
}


