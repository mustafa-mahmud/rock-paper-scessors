'use strict';

const playerEl = document.querySelector('.player');
const playerH1 = playerEl.querySelector('h1');
const computerEl = document.querySelector('.computer');
const computerH1 = computerEl.querySelector('h1');
const imgPlayer = playerEl.querySelectorAll('img');
const imgComputer = computerEl.querySelectorAll('img');
const spanElAll = document.querySelectorAll('span');
const strongEl = document.querySelector('strong');
const overlayEl = document.querySelector('.overlay');
const againPlayBtn = overlayEl.querySelector('button');
const imgContainer = document.querySelectorAll('.img-container');

const maxTurn = 5;
let left = 0;
let turn = 0;
let playerScore = 0;
let computerScore = 0;
let rand = [];

strongEl.textContent = `${left}/${maxTurn}`;

function activePlayer() {
  imgPlayer.forEach((img) => img.classList.remove('active'));
  imgComputer.forEach((img) => img.classList.remove('active'));
  imgPlayer.forEach((img) => (img.style.pointerEvents = 'auto'));

  playerH1.classList.remove('active');
  computerH1.classList.remove('active');
  imgContainer.forEach((img) => img.classList.remove('active'));

  spanElAll[turn].closest('h1').classList.add('active');
  imgContainer[turn].classList.add('active');
}

function playerItem(e) {
  turn = turn === 0 ? 1 : 0;
  activePlayer();

  const target = e.target;
  target.classList.add('active');

  makeCursorNone();
  computerItem();
}

function computerItem() {
  const index = Math.floor(Math.random() * 3);
  if (!rand.includes(index)) rand.push(index);

  if (rand.length < 3) {
    computerItem();
  } else {
    setTimeout(() => choosingItem(), 1000);
  }
}

function makeCursorNone() {
  imgPlayer.forEach((img) => (img.style.pointerEvents = 'none'));
}

function startGameAgain() {
  turn = turn === 0 ? 1 : 0;
  activePlayer();
}

function choosingItem() {
  rand.forEach((item, ind) => {
    setTimeout(() => {
      imgComputer[item].classList.add('active');

      setTimeout(() => {
        imgComputer[item].classList.remove('active');
      }, 500);
    }, ind * 500);
  });

  setTimeout(() => {
    imgComputer[rand[1]].classList.add('active');

    setTimeout(() => ckWinner(), 1500);
  }, 1500);
}

function ckWinner() {
  const imgPlr = Array.from(imgPlayer).find((img) =>
    img.classList.contains('active')
  );
  const imgCom = Array.from(imgComputer).find((img) =>
    img.classList.contains('active')
  );

  const resultPlayer = [imgPlr.getAttribute('alt'), 'player'];
  const resultComputer = [imgCom.getAttribute('alt'), 'computer'];

  if (resultPlayer[0] === 'rock' && resultComputer[0] === 'scissors') {
    if (resultPlayer[0] === 'rock') winner('player');
    else winner('computer');
  } else if (resultPlayer[0] === 'scissors' && resultComputer[0] === 'rock') {
    if (resultPlayer[0] === 'rock') winner('player');
    else winner('computer');
  } else if (resultPlayer[0] === 'rock' && resultComputer[0] === 'paper') {
    if (resultPlayer[0] === 'paper') winner('player');
    else winner('computer');
  } else if (resultPlayer[0] === 'paper' && resultComputer[0] === 'rock') {
    if (resultPlayer[0] === 'paper') winner('player');
    else winner('computer');
  } else if (resultPlayer[0] === 'scissors' && resultComputer[0] === 'paper') {
    if (resultPlayer[0] === 'scissors') winner('player');
    else winner('computer');
  } else if (resultPlayer[0] === 'paper' && resultComputer[0] === 'scissors') {
    if (resultPlayer[0] === 'scissors') winner('player');
    else winner('computer');
  } else {
    draw();
  }
}

function winner(win) {
  setTimeout(() => {
    left++;
    strongEl.textContent = `${left}/${maxTurn}`;

    if (win === 'player') {
      playerScore++;
      speech('you won');
      playerEl.querySelector('p').textContent = `Score: ${playerScore}`;
    }

    if (win === 'computer') {
      computerScore++;
      speech('computer won');
      computerEl.querySelector('p').textContent = `Score: ${computerScore}`;
    }

    if (left === maxTurn) return gameOver();
    startGameAgain();
  }, 1500);
}

function draw() {
  speech('game draw');
  startGameAgain();
}

function gameOver() {
  makeCursorNone();
  overlayEl.style.display = 'flex';
  overlayEl.querySelector('p').textContent = '';
  setTimeout(() => {
    if (playerScore > computerScore) {
      overlayEl.querySelector('p').textContent = 'You Won';
      speech('game over. you won. do you want to play again?');
    } else {
      overlayEl.querySelector('p').textContent = 'Computer Won';
      speech('game over. computer won. do you want to play again?');
    }
  }, 1500);
}

function speech(text) {
  const mouth = window.speechSynthesis;
  const voice = new SpeechSynthesisUtterance(text);

  mouth.speak(voice);
}

function newGame() {
  playerScore = 0;
  computerScore = 0;
  left = 0;
  turn = 0;

  playerEl.querySelector('p').textContent = 'Scores: 0';
  computerEl.querySelector('p').textContent = 'Scores: 0';

  activePlayer();

  strongEl.textContent = `${0}/${maxTurn}`;
  spanElAll[turn].closest('h1').classList.add('active');
  imgContainer[turn].classList.add('active');
  overlayEl.style.display = 'none';
}

activePlayer();
imgPlayer.forEach((img) => img.addEventListener('click', playerItem));
againPlayBtn.addEventListener('click', newGame);
