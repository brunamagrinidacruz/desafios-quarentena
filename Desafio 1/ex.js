const playerAttacks = {
  reprovacaoEmCalculo: {
    power: 40,
    accuracy: 100,
    name: 'Reprovação em Cálculo',
    type: 'electric',
  },
  aulaDoMello: {
    power: 40,
    accuracy: 100,
    name: 'Aula do Mello',
    type: 'normal',
  },
  segmentationFault: {
    power: 80,
    accuracy: 70,
    name: 'Segmentation Fault',
    type: 'electric',
  },
  transformarEmMembroDoGema: {
    power: 110,
    accuracy: 80,
    name: 'Transformar em membro do GEMA',
    type: 'fighting',
  }
}
let player = new Player("Loro José", 274, 274, playerAttacks, document.getElementById('player-health'));

const opponentAttacks = {
  cometa: {
    power: 40,
    accuracy: 100,
    name: 'Cometa',
    type: 'normal',
  },
  bubble: {
    power: 40,
    accuracy: 100,
    name: 'Bubble',
    type: 'water',
  },
  waterGun: {
    power: 40,
    accuracy: 100,
    name: 'Water Gun',
    type: 'water',
  },
  hydroPump: {
    power: 110,
    accuracy: 80,
    name: 'Hydro Pump',
    type: 'water',
  }
}
let opponent = new Player("Dr. Sérgio", 292, 292, opponentAttacks, document.getElementById('opponent-health'));

const turnText = document.getElementById('text');
let isTurnHappening = false;

function gameOver (winner) {
  // Wait 1000 (Health loss animation)
  setTimeout(() => {
    // Update HTML text with the winner
    turnText.innerText = winner + ' is the winner!';
    // Open alert with the winner
    alert(winner + ' is the winner! Close this alert to play again');
    // Reload the game
    window.location.reload();
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

  // Update HTML text with the used attack
  turnText.innerText = `${player.name} usou ${playerChosenAttack.name}`;

  canAttack = player.canAttack(playerChosenAttack.accuracy);
  if(canAttack) {
    gameIsOver = player.attackOpponent(playerChosenAttack, opponent);
    if(gameIsOver) gameOver(player.name)
  } else {
    // Update HTML text in case the attack misses
    turnText.innerText += ', mas errou!';
  }

  // Wait 2000ms to execute opponent attack (Player attack animation time)
  setTimeout(() => {

    //Generate a attack randomly
    const opponentAttack = opponent.randomlyAttack();

    // Update HTML text with the used attack
    turnText.innerText = `${opponent.name} usou  ${opponentAttack.name}`;

    //Check if the opponent can or can not attack
    canAttack = opponent.canAttack(opponentAttack.accuracy);
    if(canAttack) {
      gameIsOver = opponent.attackOpponent(opponentAttack, player);
      if(gameIsOver) gameOver(opponent.name)
    } else {
      // Update HTML text in case the attack misses
      turnText.innerText += ', mas errou!';
    }

    // Wait 2000ms to end the turn (Opponent attack animation time)
    setTimeout(() => {
      // Update HTML text for the next turn
      turnText.innerText = 'Escolha um ataque!';
      isTurnHappening = false;
    }, 2000);
  }, 2000);
}

// Set buttons click interaction
document.getElementById('attack1-button').addEventListener('click', function() {
  turn(player.getAttack('reprovacaoEmCalculo'));
});
document.getElementById('attack2-button').addEventListener('click', function() {
  turn(player.getAttack('aulaDoMello'));
});
document.getElementById('attack3-button').addEventListener('click', function() {
  turn(player.getAttack('segmentationFault'));
});
document.getElementById('attack4-button').addEventListener('click', function() {
  turn(player.getAttack('transformarEmMembroDoGema'));
});
