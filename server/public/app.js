//previousDice, previousDice2,
let scores, roundScore, activePlayer, gamePlaying, x; //gamePlaying is declared here.
init();

//creat func to let user choose a winning score and store the value to x. Clear input on click of submit
function chooseYourScore() {
  x = document.getElementById("userInput").value;
  if (x == 0 || !x) {
    alert('C\'mon, how can you win before you\'ve even begun?! Enter a real number to un-hide the game buttons.');
    document.getElementById("userInput").classList.add('warning');
    document.querySelector('.btn-new').style.visibility = 'hidden';
    document.querySelector('.btn-roll').style.visibility = 'hidden';
    document.querySelector('.btn-hold').style.visibility = 'hidden';
  } else {
    document.getElementById("userInput").classList.remove('warning');
    document.querySelector('.btn-new').style.visibility = 'visible';
    document.querySelector('.btn-roll').style.visibility = 'visible';
    document.querySelector('.btn-hold').style.visibility = 'visible';
    alert('You chose: ' + x + ' as the number needed to win.');
  }
  //Clear user input on Submit
  document.getElementById('userInput').value = '';
}

//Call chooseYourScore on click of Submit button (user specified score)
document.querySelector('.btn-score').addEventListener('click', chooseYourScore);

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    //1. use the random numb from math random
    //dice = Math.floor(Math.random() * 6) + 1;
    dice = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
    //2. Displaly result
    let diceDOM = document.querySelector('.dice');
    let diceDOM2 = document.querySelector('#dice2');
    diceDOM.style.display = 'block';
    diceDOM2.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM2.src = 'dice-' + dice2 + '.png';


    if (dice === 6 && dice2 === 6) {
      //console.log('6 event triggered');
      roundScore = 0;
      //reset dice value
      dice = 0;
      dice2 = 0;
      //previousDice = dice;
      //previousDice2 = dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      document.querySelector('#score-' + activePlayer).textContent = roundScore;
      nextPlayer();
    }

    //3. Update round score IF rolled num is NOT a 1
    if (dice !== 1 && dice2 !== 1) {
      //add score
      roundScore += dice;
      roundScore += dice2;
      //Display round score -->
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
    //if no 1, give previousDice the val of dice
    //previousDice = dice;
    //previousDice2 = dice2;

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
    if (scores[activePlayer] >= x) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!';
      document.querySelector('#dice2').style.display = 'none';
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
  document.querySelector('#dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

//initialize new game with a function
function init() {

  document.querySelector('.btn-new').style.visibility = 'hidden';
  document.querySelector('.btn-roll').style.visibility = 'hidden';
  document.querySelector('.btn-hold').style.visibility = 'hidden';

  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true; // Must declare up top in the GLOBAL scope so whole file can access..
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('#dice2').style.display = 'none';

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
roundScore = 0;*/
