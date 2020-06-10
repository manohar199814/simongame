var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattren = [];
var userClickedPattren = [];
var gameStarted = 'n';
var level = 0;

function nextSequence() {
  userClickedPattren = [];
  level++;
  $("h1").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattren.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattren.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattren.length-1);
});


function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {

  $("." + currentColour).addClass("pressed");

  setTimeout(function() {

    $("." + currentColour).removeClass("pressed");

  }, 100);
}

$(document).keypress(function() {
  if (gameStarted === 'n') {
    gameStarted = 'y';
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if(gamePattren[currentLevel] === userClickedPattren[currentLevel]) {
    if (userClickedPattren.length === gamePattren.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }else {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over Press Any Key To Restart");
    startOver();
    console.log(gamePattren);
    // console.log(gameStarted);
  }

}

function startOver(){
  level = 0;
  gamePattren = [];
  gameStarted='n';
}
