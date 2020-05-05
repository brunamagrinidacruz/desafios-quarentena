let url = new URL(window.location.href);

let player = new Player("Loro José", ELETRIC, 274, 274, document.getElementById('player-health'));
attachAttackToPlayer(player, 'reprovacaoEmCalculo');
attachAttackToPlayer(player, 'aguaNoPC');
attachAttackToPlayer(player, 'segmentationFault');
attachAttackToPlayer(player, 'transformarEmMembroDoGema');

let opponent = new Player("Dr. Sérgio", ROCK, 292, 292, document.getElementById('opponent-health'));
attachAttackToPlayer(opponent, 'cometa');
attachAttackToPlayer(opponent, 'tsunami');
attachAttackToPlayer(opponent, 'rugido');
attachAttackToPlayer(opponent, 'eraDoGelo');

const turnText = document.getElementById('text');
let isTurnHappening = false;
let round = url.searchParams.get("round") == null ? 1 : url.searchParams.get("round");
if(round > 1) {
  upgradePlayer(round, player);
  upgradePlayer(round, opponent);
}

function gameOver (winner) {
  // Wait 1000 (Health loss animation)
  setTimeout(() => {
    // Update HTML text with the winner
    turnText.innerText = `${winner} ${isTheWinner}`;
    // Open alert with the winner
    alert(`${winner} ${isTheWinner} ${closeThisAlertToPlayAgain}`);
    
    // Reload the game passing the round
    url.searchParams.set('round', parseInt(round)+1);
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

  // Wait 2000ms to execute opponent attack (Player attack animation time)
  setTimeout(() => {

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
  turn(player.getAttack('reprovacaoEmCalculo'));
});
document.getElementById('attack2-button').addEventListener('click', function() {
  turn(player.getAttack('aguaNoPC'));
});
document.getElementById('attack3-button').addEventListener('click', function() {
  turn(player.getAttack('segmentationFault'));
});
document.getElementById('attack4-button').addEventListener('click', function() {
  turn(player.getAttack('transformarEmMembroDoGema'));
});
