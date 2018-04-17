/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// CREATING VARIABLES FOR SCORE
var score, roundScore, activePlayer, dice;

// SCORE IN ARRAY
score = [0, 0];
roundScore = 0;
activePlayer = 0;

// Setting initial values to 0 for player 1
$("#score-0").html(0);
$("#current-0").html(0);


// Setting initial values to 0 for player 2
$("#score-1").html(0);
$("#current-1").html(0);


// SETTING THE VALUE FOR THE CURRENT PLAYER
$("#current-" + activePlayer).html(dice);

// hidding the dice for the beginnig round
$(".dice").css({display: "none"});

// Next player function
function NextPlayer(){
    // chaning to next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //setting round score back to 0
    roundScore = 0;

    // changing UI 
    $("current-0").text("0");
    $("current-1").text("0");

    // selecting active player        
    $(".player-0-panel").toggleClass("active");
    $(".player-1-panel").toggleClass("active");
}

//seeting up the event handler for rolling the dice
$(".btn-roll").click(event => {
    // 1.CREATING RANDOM NUMBERS TO ROLL THE DICE 
    var dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);
    
    // 2.displaying the dice again after cliking 
    var diceDOM = $(".dice");
    diceDOM.css({display: "block"});
 
    // 3.displaying the correnct number 
       diceDOM.attr("src", "dice-" + dice + ".png");

    // 4.update the score if the roll !=1
    if(dice !== 1){
        // add the score
        roundScore += dice;
        $("#current-" + activePlayer).text(roundScore);
    } else {        
        NextPlayer(); // calling next player
        //hidding the dice againg
        $(".dice").css({
            display: "none"
        });
    }
}); 

// event listener for the Hold btn
$(".btn-hold").click(event => {
    //1. Add current score to global socor
    score[activePlayer] += roundScore;

    // 2. Update the UI
    $("#score-" + activePlayer).html(score[activePlayer]);   
     // calling next player

    // 3. Check if the player won the game
    if(score[activePlayer] >= 10){
        $("#name-" + activePlayer).html("winner!");
        var diceDOM = $(".dice");
        diceDOM.css({display: "none"}); // hidding the dice
        $(".player-" + activePlayer + "-panel").toggleClass("winner");
        $(".player-" + activePlayer + "-panel").removeClass("active");
    } else { 
        NextPlayer();
    }

});
   
