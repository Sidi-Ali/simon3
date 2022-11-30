var colors = [ "green", "red", "yellow", "blue" ];
var gameOnColors = [];
var playerSelections = [];
var gameOn = false;
var level = 0;

function playGame(){
  level++;
  $( "h1" ).text( "Level " + level );
  playerSelections = [];
  var num = Math.floor( Math.random() * colors.length );
  var color = colors[num];
  gameOnColors.push( color );
  animateColor( color );
  playButtonSound( color );
}

function checkPlayerSelections( arrIndex ){
  if ( gameOnColors[ arrIndex ] === playerSelections[ arrIndex ] ){
      if ( gameOnColors.length === playerSelections.length ){
        setTimeout(function () {
          playGame();
        }, 1000);
      }
  }
  else{
    gameOver();
  }
}

function playButtonSound( buttonPressed ){
  var audio = new Audio( "sounds/" + buttonPressed + ".mp3" );
  audio.play();
}

function animateColor(color){
  $( "." + color ).addClass( "blink" );
  setTimeout(function () {
    $( "." + color).removeClass( "blink" );
  }, 100 );
}

$(document).on("keypress", function(){
  if ( !gameOn ){
    playGame();
    gameOn = true;
  }
});

$(".startButton").on("click", function(){
  if ( !gameOn ){
    playGame();
    gameOn = true;
  }
});

$(".box").on("click", function(e){
  var clickedColor = e.target.id;
  playerSelections.push( clickedColor );
  animateColor( clickedColor );
  playButtonSound( clickedColor );
  checkPlayerSelections( playerSelections.length - 1 );
});

function gameOver(){
  $("body").addClass("gameOver");
  playButtonSound("wrong");
  setTimeout(function () {
    $("body").removeClass("gameOver");
  }, 100);
  $("h1").html("<p>Game over!!!</p> <p>click the start button to restart.</p>");
  gameOn = false;
  gameOnColors = [];
  level = 0;
}
