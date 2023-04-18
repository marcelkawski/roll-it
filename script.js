'use strict';

let currentPlayer = 0;
let scores = [0, 0];
let currentScore = 0;

const minWinnerScore = 10;
const numPlayers = 2;

// const defActPlayerBckgrndColor =

const rollImg = document.querySelector('.dice');
const player0Section = document.querySelector('.player--0');
const player1Section = document.querySelector('.player--1');

const switchPlayer = function () {
  currentPlayer = getNextPlayer();
  player0Section.classList.toggle('player--active');
  player1Section.classList.toggle('player--active');
};

const switchPlayerUpdateCurrentScore = function () {
  currentScore = 0;
  updateCurrentScore(currentPlayer, currentScore);
  switchPlayer();
};

const getNextPlayer = () => (currentPlayer + 1) % 2;

const drawDice = () => Math.trunc(Math.random() * 6 + 1);

const updateCurrentScore = function (player, currentScore) {
  document.querySelector(`#current--${player}`).textContent = currentScore;
};

const updateScore = function (player, score) {
  document.querySelector(`#score--${player}`).textContent = score;
};

const getCurrentPlayerSection = () =>
  document.querySelector(`.player--${currentPlayer}`);

const markWinner = function () {
  const curPlayerSection = getCurrentPlayerSection();
  // const playersNames = document.querySelectorAll('.name');
  // const playersScores = document.querySelectorAll('.score');
  // const playersCurrents = document.querySelectorAll('.current');
  curPlayerSection.classList.add('player--winner');
  // playersNames[currentPlayer].classList.add('player--winner');
  // playersScores[currentPlayer].classList.add('player--winner');
  // playersCurrents[currentPlayer].classList.add('player--winner');
};

// rolling a dice
document.querySelector('.btn--roll').addEventListener('click', function () {
  const dice = drawDice();
  rollImg.classList.remove('hidden');
  rollImg.src = `resources/dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    updateCurrentScore(currentPlayer, currentScore);
  } else switchPlayerUpdateCurrentScore();
});

// holding a current score
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (currentScore > 0) {
    scores[currentPlayer] += currentScore;
    updateScore(currentPlayer, scores[currentPlayer]);
    if (scores[currentPlayer] >= minWinnerScore) {
      markWinner();
    } else switchPlayerUpdateCurrentScore();
  }
});

const resetScores = function (currentScore, scores) {
  for (let i = 0; i < numPlayers; i++) {
    updateCurrentScore(i, currentScore);
    updateScore(i, scores[i]);
  }
};

// reseting game state
document.querySelector('.btn--new').addEventListener('click', function () {
  const curPlayerSection = getCurrentPlayerSection();
  if (curPlayerSection.classList.contains('player--winner'))
    curPlayerSection.classList.remove('player--winner');
  if (currentPlayer === 1) switchPlayer();
  scores = [0, 0];
  currentScore = 0;
  resetScores(currentScore, scores);

  rollImg.classList.add('hidden');
});
