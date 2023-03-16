//alert("working");

var buttonColours=["red","blue","yellow","green"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
//intializing only when a key is pressed
$("body").on("keydown",function(){
    if(!started){
$("#level-title").text("Level " + level);
    started=true;
    nextSequence();
    }
  });
//user button ip function
    $(".btn").click(function(){
        var userChosenColor=$(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length-1);
    })

   function nextSequence(){
    userClickedPattern=[];//empty user pattern
    level++;
    console.log(level);
    $("#level-title").text("Level " + level);
    //choosing random color
    var randomNumber=  Math.floor( Math.random()*4 );
    var randomChosenColor=buttonColours[randomNumber];
    
     gamePattern.push(randomChosenColor);
     $("#" +randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(randomChosenColor);
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
     audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed"); 
    },100)
}
function checkAnswer(currentLevel){
 
        if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
            console.log("true");
            if(gamePattern.length===userClickedPattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);}
        }
        else{
            $("body").addClass("game-over");
            console.log("wrong");
            setTimeout(function(){
              $("body").removeClass("game-over");
              $("h1").text("Game Over, Press Any Key to Restart");
            },200)
            startOver();

        }
}
function startOver(){
   level=0;
   gamePattern=[];
   started=false;
}