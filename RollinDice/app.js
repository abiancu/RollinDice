/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// CREATING VARIABLES FOR SCORE
var score, roundScore, activePlayer, dice1, dice2, gamePlaying, hiddeDice;

StartGame();

// SETTING THE VALUE FOR THE CURRENT PLAYER
$("#current-" + activePlayer).html(0);

// hidding the dice for the beginnig round
hideDice = $(".dice").css({display: "none"});

// Start / NewGame 
function StartGame() {
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

    gamePlaying = true;
}

// Next player function
function NextPlayer(){
    // chaning to next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    
    //setting round score back to 0
    roundScore = 0;

    // changing UI 
    $("#current-0").html(0);
    $("#current-1").html(0);

    // selecting active player        
    $(".player-0-panel").toggleClass("active");
    $(".player-1-panel").toggleClass("active");
}


//seeting up the event handler for rolling the dice
$(".btn-roll").click(event => {
   if(gamePlaying){
        // 1.CREATING RANDOM NUMBERS TO ROLL THE DICE 
        dice1 = Math.floor(Math.random() * 6) + 1;
        console.log(dice1);

        // Adding second dice
        dice2 = Math.floor(Math.random() * 6) + 1;
        console.log(dice2);

        // 2.displaying the dice again after cliking 
        var diceDOM = $("#dice-1");
        var diceDOM2 = $("#dice-2");
        
        diceDOM.css({
            display: "block"
        }); 
        diceDOM2.css({display: "block"}); 

        // 3.displaying the correnct number 
        diceDOM.attr("src", "dice-" + dice1 + ".png");
        diceDOM2.attr("src", "dice-" + dice2 + ".png"); // to display the second dice roll to the DOM
        

        // 4.update the score if the roll !=1
        if (dice1 !== dice2 ) {
            // add the score
            roundScore += dice1 + dice2;
            $("#current-" + activePlayer).text(roundScore);
        }else if(dice1 === 6 && dice2 === 6){
            score[activePlayer] = 0;
            $("#score-" + activePlayer).html(score[activePlayer]);
            NextPlayer();
        }
        else{
            NextPlayer(); // calling next player
            //hidding the dice againg
            $(".dice").css({
                display: "block"
            });
        }
        
    }
}); 

// event listener for the Hold btn
$(".btn-hold").click(event => {
   if(gamePlaying){
        
        //1. Add current score to global socor
        score[activePlayer] += roundScore;

        // 2. Update the UI
        $("#score-" + activePlayer).html(score[activePlayer]);
        // calling next player

        // reading input score
        var finalScore = $(".final-score").val();
        var winningScore;

        if(finalScore){
            winningScore = finalScore;
        }else{
            winningScore = 100;
        }

        // 3. Check if the player won the game
        if (score[activePlayer] >= winningScore) {
            $("#name-" + activePlayer).html("winner!");
            var diceDOM = $(".dice");
            diceDOM.css({
                display: "none"
            }); // hidding the dice
            $(".player-" + activePlayer + "-panel").toggleClass("winner");
            $(".player-" + activePlayer + "-panel").removeClass("active");
            gamePlaying = false;
        } else {
            NextPlayer();
        }
   }

});


// New game functionality
$(".btn-new").click(event => {
    // reset the scores to 0
        StartGame();
    // reset active player to 0
       $(".player-0-panel").toggleClass("active");
       $(".player-1-panel").removeClass("active");

        $(".player-0-panel").removeClass("winner");
        $(".player-1-panel").removeClass("winner");
       $("#name-0").html("Player 1");
        $("#name-1").html("Player 2");

       

    // reset round scores
});
   


