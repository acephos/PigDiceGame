'use strict';

//Global Variables
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const WINNING_SCORE = 20;
let playing = true;
let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;

//Functions
const startAgain = function () {
  playing = true;
  btnRoll.disabled = false;
  btnHold.disabled = false;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const rollDice = function () {
  if (!playing) return;
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  if (dice === 1) {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    switchPlayer();
  } else {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  }
};

const holdScore = function () {
  if (!playing) return;
  score[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];

  if (score[activePlayer] < WINNING_SCORE) {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    switchPlayer();
  } else {
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    playing = false;
    btnRoll.disabled = true;
    btnHold.disabled = true;
    const winner = activePlayer === 0 ? player0El : player1El;
    winner.classList.add('player--winner');
    winner.classList.remove('player--active');
    document.getElementById(`name--${activePlayer}`).textContent = `Player ${activePlayer + 1} wins!`;
    diceEl.classList.add('hidden');
  }
};

//Starting Conditions
startAgain();

//Button Clicks
btnNew.addEventListener('click', startAgain);
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
