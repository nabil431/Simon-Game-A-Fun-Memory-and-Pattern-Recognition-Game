var buttonColours =["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keydown(function(){
    if (!started){
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
    
    
});
$(".btn").click(function() {
    var userchosencolor=$(this).attr("id");
    userClickedPattern.push(userchosencolor);

    playsound(userchosencolor);

    animatePress(userchosencolor);

    checkAnswer(userClickedPattern.length-1);
})


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
         console.log("Success");
         if (userClickedPattern.length ===  gamePattern.length) {
            setTimeout(() => {
              nextSequence();
            }, 1000);
    }
}
    else {
        console.log("Wrong");
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomnumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomnumber];
    gamePattern.push(randomChosenColour);
   
$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playsound(randomChosenColour);
};

function playsound (name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
    
}

function startOver(){

    level=0;
    gamePattern=[];
    started=false;
   
}
   
