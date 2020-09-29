let gamePattern = [];
let userClickedPattern = [];
const buttonColors = ['red', 'blue', 'green', 'yellow'];

let level = 0;

const playSound = (name) => {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

const animatePress = (currentColor) => {
  $(`#${currentColor}`).addClass('pressed');
  setTimeout(function () {
    $(`#${currentColor}`).removeClass('pressed');
  }, 100);
};

const nextSequence = () => {
  level++;
  userClickedPattern = [];
  $('h1').text(`Level ${level}`);
  const randomNumber = Math.round(Math.random() * 3);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
};

$(document).keypress(function () {
  if (!level) {
    nextSequence();
  }
});

const startOver = () => {
  level = 0;
  gamePattern = [];
};

const checkAnswer = (currentLevel) => {
  if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    $('h1').text('Game Over, Press Any Key to Restart');
    startOver();
  } else if (currentLevel === gamePattern.length - 1) {
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
};

$('.btn').click(function handler() {
  const userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
