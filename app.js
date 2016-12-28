/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score, roundScore, activePlayer , gamePlaying , previousRoll;
init();
function init(){
    score = [0, 0];
    roundScore=0; 
    activePlayer= 0; 
    gamePlaying= true;
    previousRoll=0;


// now lets do some DOM manipulation. 

//document.querySelector('#current-' + activePlayer).textContent = dice; // # is id Selector and . is class selector
//
//document.querySelector('#current-' +activePlayer).innerHTML= '<em>'+ dice + '</em>';

//var x = document.querySelector('#score-0').textContent;
//console.log(x);

    document.querySelector('.dice').style.display='none';
    document.getElementById('score-0').textContent='0'; //getElementById is a bit faster than querySelector.
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.btn-roll').addEventListener('click', function(){
    //calculate the random number:
    if(gamePlaying){
        
        var dice = Math.floor(Math.random() *6)+1; //plus one to get a no. from 1-6 instead of 0 to 5. 
        //display the random no. 
        
        
        var diceDom= document.querySelector('.dice');
        diceDom.style.display= 'block';
        diceDom.src='dice-' + dice + '.png';

        // now add up score if the dice did not roll a 1.
        
        if (previousRoll === 6 && dice=== 6){
            score[activePlayer]=0;
            document.getElementById('score-' + activePlayer).textContent=score[activePlayer];
            nextPlayer(); 
        }
        if (dice !== 1){
            roundScore+=dice;
            document.getElementById('current-' + activePlayer).textContent=roundScore;
        }
        else{
            nextPlayer()
        } 
        previousRoll = dice; 
    }
})

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        score[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
        var input = document.querySelector('.final-score').value;
        var winningScore;
        console.log(input);
        //input will be true only if the value is not 0, Null, undefined or "" . 
        if(input){
            winningScore = input;
        }else 
            {
                winningScore = 100;
            }
        if(score[activePlayer] >=winningScore){
            document.getElementById('name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
            gamePlaying=false;
        }
        else{
            nextPlayer();   
        }
    }
})
                               
function nextPlayer(){
    roundScore=0;
    document.getElementById('current-' + activePlayer).textContent=0;
    activePlayer===0 ? activePlayer=1 : activePlayer=0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //document.querySelector('.player-0-panel').classList.add/remove('active'); add or remove could be used instead of toggle but with toggle its way easier.
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);