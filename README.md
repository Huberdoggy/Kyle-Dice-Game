## Kyle's Dice Game:
**NOW LIVE ON HEROKU!**

**https://polar-coast-79472.herokuapp.com/**

Kyle's Dice Game is an application built utilizing basic Javascript, and DOM manipulation methods. Prior to starting, a player MUST enter a non-zero 'winning score' to reveal the game buttons in the center panel. Failure to do this, or failure to input ANY value will result in a warning dialogue and the user input will turn red until a non-zero number is provided. The game will run until a player reaches at least the score they specified at the beginning of the game, at which point, that player will be determined the winner upon 'holding'. A player can continue clicking for as many times as they wish. If the player rolls a 1, the turn will end and that player will not recieve any additional points onto their global counter. Otherwise, the players cumulative 'current' points will be added to the global counter upon clicking 'hold'. Rolling two 6's in a row will result in that player losing ALL points from their current AND global counter, and the turn will pass to the next player.

**INSTALL AND RUN: -->**
- npm install
- npm start

**BUILT WITH: -->**
- Javascript
- HTML/CSS
- Node/Express
