//previousDice, previousDice2,
let scores, roundScore, activePlayer, gamePlaying, dice, dice2, x; //gamePlaying is declared here.
init();

//creat func to let user choose a winning score and store the value to x. Clear input on click of submit
function chooseYourScore() {
  x = document.getElementById("userInput").value;
  if (x == 0 || !x) {
    swal({
      title: "SAY WHAT!?",
      text: "C\'mon, how can you win before you\'ve even begun?! Enter a NUMBER greater than zero.",
      icon: "warning",
      button: "Aww man, okay",
    });
    document.getElementById("userInput").classList.add('warning');
    document.querySelector('.btn-new').style.visibility = 'hidden';
    document.querySelector('.btn-roll').style.visibility = 'hidden';
    document.querySelector('.btn-hold').style.visibility = 'hidden';
  } else {
    document.getElementById("userInput").classList.remove('warning');
    document.querySelector('.btn-new').style.visibility = 'visible';
    document.querySelector('.btn-roll').style.visibility = 'visible';
    document.querySelector('.btn-hold').style.visibility = 'visible';
    swal({
      title: "GOOD LUCK!",
      text: 'GAME ON!',
      icon: "success",
      button: "Cool, thanks.",
    });
  }
  //Clear user input on Submit
  document.getElementById('userInput').value = '';
}

//Call chooseYourScore on click of Submit button (user specified score)
document.querySelector('.btn-score').addEventListener('click', chooseYourScore);

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    //1. use the random numb from math random
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
      roundScore = 0;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      document.querySelector('#score-' + activePlayer).textContent = roundScore;
      swal({
        title: "OH DARN!",
        text: "You rolled double 6's. You lose ALL of your points! Round passes to next player.",
        icon: "info",
        button: "Aww man, okay",
      });
      nextPlayer();
    } else if (dice === 1 || dice2 === 1) {
      roundScore = 0;
      //Display round score -->
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      swal({
        title: "OH DARN!",
        text: "You rolled a 1. You lose your points for THIS turn. Round passes to next player.",
        icon: "info",
        button: "Aww man, okay",
      });
      nextPlayer();
      //3. Update round score IF rolled num is NOT a 1
    } else {
      roundScore += dice;
      roundScore += dice2;
      //add score
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
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
  document.querySelector('.dice').style.display = 'visible';
  document.querySelector('#dice2').style.display = 'visible';

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
