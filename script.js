'use strict';

// comment for the 2nd solution of initializing and reseting game state:
let currentPlayer = 0;
let scores = [0, 0];
let currentScore = 0;
let playing = true;

const minWinnerScore = 100;
const numPlayers = 2;

const rollImg = document.querySelector('.dice');
const player0Section = document.querySelector('.player--0');
const player1Section = document.querySelector('.player--1');

const updateCurrentScore = (player, currentScore) =>
  (document.querySelector(`#current--${player}`).textContent = currentScore);

const updateScore = (player, score) =>
  (document.querySelector(`#score--${player}`).textContent = score);

const resetScores = function (currentScore, scores) {
  for (let i = 0; i < numPlayers; i++) {
    updateCurrentScore(i, currentScore);
    updateScore(i, scores[i]);
  }
};

// ---------------------------------------------------------------------------------------------
// We could also make initializing and resetting game state like this (In .btn--new event handler I check the current state and update it basing on the current state. We can omit that and just set the initial value and remove every additional class etc. to make it like at the beginning of the game. Then we need to comment the initialization of the variables above ^ and .btn--new event handler below and uncomment alternative event handler below.):

// let currentPlayer, scores, currentScore, playing;

// const initGame = function () {
//   currentPlayer = 0;
//   scores = [0, 0];
//   currentScore = 0;
//   playing = true;

//   resetScores(currentScore, scores);

//   player0Section.classList.remove('player--winner');
//   player1Section.classList.remove('player--winner');
//   player0Section.classList.add('player--active');
//   player1Section.classList.remove('player--active');

//   rollImg.classList.add('hidden');
// };

// initGame();

// ---------------------------------------------------------------------------------------------

const getNextPlayer = () => (currentPlayer + 1) % 2;

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

const drawDice = () => Math.trunc(Math.random() * 6 + 1);

const getCurrentPlayerSection = () =>
  document.querySelector(`.player--${currentPlayer}`);

const markWinner = () =>
  getCurrentPlayerSection().classList.add('player--winner');

// rolling a dice
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playing) {
    const dice = drawDice();
    rollImg.classList.remove('hidden');
    rollImg.src = `resources/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      updateCurrentScore(currentPlayer, currentScore);
    } else switchPlayerUpdateCurrentScore();
  }
});

// holding a current score
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (playing) {
    if (currentScore > 0) {
      scores[currentPlayer] += currentScore;
      updateScore(currentPlayer, scores[currentPlayer]);
      if (scores[currentPlayer] >= minWinnerScore) {
        playing = false;
        markWinner();
        rollImg.classList.add('hidden');
      } else switchPlayerUpdateCurrentScore();
    }
  }
});

// reseting game state
document.querySelector('.btn--new').addEventListener('click', function () {
  playing = true;
  const curPlayerSection = getCurrentPlayerSection();
  if (curPlayerSection.classList.contains('player--winner'))
    curPlayerSection.classList.remove('player--winner');
  if (currentPlayer === 1) switchPlayer();
  scores = [0, 0];
  currentScore = 0;
  resetScores(currentScore, scores);

  rollImg.classList.add('hidden');
});

// reseting game state (2nd solution)
// document.querySelector('.btn--new').addEventListener('click', initGame);
