/* 
  TODOS OS DESAFIOS (BONUS OU NÃO) FORAM IMPLEMENTADOS
  Desafio 1: ok
  Desafio Bonus 1: ok
  Desafio Bonus 2: ok (class Bonus.js)
  Desafio Bonus 3: ok (class Properties.js)
  Desafio Bonus 4: ok (controle de rounds com parametro em GET e update de ataques class Attack.js)
  Desafio Bonus 5: ok
*/

const url = new URL(window.location.href);
const maxRounds = 2; 

let player = new Player("Loro José", ELETRIC, 274, 274, document.getElementById('player-health'), ["assets/pirate.gif", "assets/pirate-level2.gif"]);
attachAttackToPlayer(player, 'reprovacaoEmCalculo');
attachAttackToPlayer(player, 'aguaNoPC');
attachAttackToPlayer(player, 'transformarEmMembroDoGema');
attachAttackToPlayer(player, 'segmentationFault');

let opponent = new Player("Dr. Sérgio", ROCK, 292, 292, document.getElementById('opponent-health'), ["assets/dinossaur.gif", "assets/dinossaur-level2.gif"]);
attachAttackToPlayer(opponent, 'cometa');
attachAttackToPlayer(opponent, 'tsunami');
attachAttackToPlayer(opponent, 'rugido');
attachAttackToPlayer(opponent, 'eraDoGelo');

const turnText = document.getElementById('text');
let isTurnHappening = false;
let round = url.searchParams.get("round") == null ? 1 : url.searchParams.get("round");
if(round > 1) {
  upgradeAttackPlayer(round, player);
  upgradeAttackPlayer(round, opponent);
}

//Set the round counter
document.getElementById("round").innerHTML = `Round: ${round}`;

//Initialize the text and value of the button of attacks
function initializePlayerAttacks() {
  let attack1 = document.getElementById("attack1-button");
  attack1.innerHTML = player.getAttackByIndex(0).name;
  attack1.value = player.getAttackByIndex(0).id;
  let attack2 = document.getElementById("attack2-button");
  attack2.innerHTML = player.getAttackByIndex(1).name;
  attack2.value = player.getAttackByIndex(1).id;
  let attack3 = document.getElementById("attack3-button");
  attack3.innerHTML = player.getAttackByIndex(2).name;
  attack3.value = player.getAttackByIndex(2).id;
  let attack4 = document.getElementById("attack4-button");
  attack4.innerHTML = player.getAttackByIndex(3).name;
  attack4.value = player.getAttackByIndex(3).id;
}
initializePlayerAttacks();

//Set image level 1 as pattern
document.getElementById("opponent-image").setAttribute("src", opponent.getImage(0));
document.getElementById("player-image").setAttribute("src", player.getImage(0));

//Initialize the image of player
function initializeImages() {
  let image;

  //If the image to the round exists, update
  image = opponent.getImage(parseInt(round) - 1);
  if(image != undefined) {
    document.getElementById("opponent-image").setAttribute("src", image);
  }

  //If the image to the round exists, update
  image = player.getImage(parseInt(round) - 1);
  if(image != undefined) {
    document.getElementById("player-image").setAttribute("src", image)
  }

}
initializeImages();

function gameOver (winner) {
  let nextRound = parseInt(round)+1;
  // Wait 1000 (Health loss animation)
  setTimeout(() => {
    // Update HTML text with the winner
    turnText.innerText = `${winner} ${isTheWinner}`;
    // Open alert with the winner
    if(round == maxRounds) {
      alert(`${winner} ${isTheWinner} ${closeThisAlertTo} ${playAgain}`);
      nextRound = 1;
    }
    else {
      alert(`${winner} ${isTheWinner} ${closeThisAlertTo} ${nextLevel}`);
    }
    
    // Reload the game passing the round
    url.searchParams.set('round', nextRound);
    window.location.href = url.href;
  }, 1000);
}

function turn(playerChosenAttack) {
  // Don't start another turn till the current one is not finished
  if (isTurnHappening) {
    return;
  }
  isTurnHappening = true;

  let gameIsOver;
  let canAttack;
  let bonusAttack;

  if(player.getParalized() > 0) {
    turnText.innerText = `${player.name} ${isParalized}`
    player.setParalized(player.getParalized()-1);
  } else {
    // Update HTML text with the used attack
    turnText.innerText = `${player.name} ${used} ${playerChosenAttack.name}`;

    canAttack = player.canAttack(playerChosenAttack.accuracy);
    if(canAttack) {
      bonusAttack = pickBonusAttack(playerChosenAttack.type, opponent.getType());
      gameIsOver = player.attackOpponent(opponent, playerChosenAttack, bonusAttack);
      if(gameIsOver) gameOver(player.name)
    } else {
      // Update HTML text in case the attack misses
      turnText.innerText += `, ${butMissed}`;
    }
  }

  // Wait 2000ms to execute opponent attack (Player attack animation time)
  setTimeout(() => {

    if(opponent.getParalized() > 0) {
      turnText.innerText = `${opponent.name} ${isParalized}`
      opponent.setParalized(opponent.getParalized()-1);
    } else {
      //Generate a attack randomly
      const opponentAttack = opponent.randomlyAttack();

      // Update HTML text with the used attack
      turnText.innerText = `${opponent.name} ${used}  ${opponentAttack.name}`;

      //Check if the opponent can or can not attack
      canAttack = opponent.canAttack(opponentAttack.accuracy);
      if(canAttack) {
        bonusAttack = pickBonusAttack(opponentAttack.type, player.getType());
        gameIsOver = opponent.attackOpponent(player, opponentAttack, bonusAttack);
        if(gameIsOver) gameOver(opponent.name)
      } else {
        // Update HTML text in case the attack misses
        turnText.innerText += `, ${butMissed}`;
      }
    }
    // Wait 2000ms to end the turn (Opponent attack animation time)
    setTimeout(() => {
      // Update HTML text for the next turn
      turnText.innerText = `${chooseOneAttack}`;
      isTurnHappening = false;
    }, 2000);
  }, 2000);
}

// Set buttons click interaction
document.getElementById('attack1-button').addEventListener('click', function() {
  turn(player.getAttack(document.getElementById('attack1-button').value));
});
document.getElementById('attack2-button').addEventListener('click', function() {
  turn(player.getAttack(document.getElementById('attack2-button').value));
});
document.getElementById('attack3-button').addEventListener('click', function() {
  turn(player.getAttack(document.getElementById('attack3-button').value));
});
document.getElementById('attack4-button').addEventListener('click', function() {
  turn(player.getAttack(document.getElementById('attack4-button').value));
});
