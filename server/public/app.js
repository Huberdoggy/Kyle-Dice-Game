/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, activePlayer, gamePlaying; //gamePlaying is declared here....
init();

//dice = Math.floor(Math.random() * 6) + 1; //gen random num without decimals
//console.log(dice);

//SETTER
//document.querySelector('#current-' + activePlayer).textContent = dice; //redfine ID to be equal to dice variable
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//GETTER
//let x = document.querySelector('#score-0').textContent; //read only the value of the content and store into var x
//console.log(x);

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    //1. use the random numb from math random
    dice = Math.floor(Math.random() * 6) + 1;
    //annonymous func - can only be used within scope of EventListener
    //2. Displaly result
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    //3. Update round score IF rolled num is NOT a 1
    if (dice !== 1) {
      //add score
      roundScore += dice;
      //roundScore = roundScore + dice
      //Display round score -->
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      //next player
      nextPlayer();
    }
  }
});

//document.querySelector('.button-roll').addEventListener('click', btn); //btn func = callback --> passed in as an argument to event listener
document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add current score to player's global score
    scores[activePlayer] += roundScore;
    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //Did player win game??
    if (scores[activePlayer] >= 100) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      //now change gamePlaying to false
      gamePlaying = false;
    } else {
      //Next player...
      nextPlayer();
    }
  }
});

//DRY dont repeat yourself... so..
function nextPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);


//initialize new game with a functio
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true; // Must declare up top in the GLOBAL scope so whole file can access..
  //Style property on dice class - hides the dice placeholder on load
  document.querySelector('.dice').style.display = 'none';

  //Set all vals to 0
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  //READD active class back to the first player..
  document.querySelector('.player-0-panel').classList.add('active');

}
/*Ternary...
activePlayer = activePlayer === 0 ? 1 : 0;
roundScore = 0;

document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


//Manipulates the class attr in the HTML div to highlight which player is active
//Toggle...
document.querySelector('.player-0-panel').classList.toggle('active');
document.querySelector('.player-1-panel').classList.toggle('active');

//ADD and REMOVE class...
//document.querySelector('.player-0-panel').classList.remove('active');
//document.querySelector('.player-1-panel').classList.add('active');
document.querySelector('.dice').style.display = 'none';*/
