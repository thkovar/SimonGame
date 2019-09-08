var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gamePattern = [];

var level = 0;
var myVar;

function nextSequence() {
  // In this function a random colour is selected, added to the gamePattern array
  // the button with the selected colour is animated and a sound is played

  var randomChosenColour = buttonColours[Math.floor(Math.random()*4)];

  gamePattern.push(randomChosenColour);

  var selectedColourId = '#' + randomChosenColour;

  $("h1").text("Level " + level);

  $(selectedColourId).fadeOut(100);
  $(selectedColourId).fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if (checkAnswer(userClickedPattern.length - 1) == "failure") {
    console.log("Game over!");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {$("body").removeClass("game-over");}, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    gamePattern = [];
    userClickedPattern = [];
    }
  else {
      if (userClickedPattern.length == gamePattern.length) {
        console.log("sequence successful");
        level++;
        userClickedPattern = [];
        setTimeout(function(){ nextSequence(); }, 1000);
    }
  }
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
   $('#' + currentColour).addClass("pressed");
   setTimeout(function() {$('#' + currentColour).removeClass("pressed");},100);
}

$(document).keypress(function(event){
  if (gamePattern.length == 0) {
    level = 0;
    nextSequence();
 }
});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
    return "success";
    }
  else
    {
      console.log("wrong");
      return "failure";
    }
}
