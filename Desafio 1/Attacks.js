const ATTACKS = {
    level1: {
        cometa: {
            id: 'cometa',
            power: 40,
            accuracy: 100,
            name: 'Cometa',
            type: ROCK,
        },
        tsunami: {
            id: 'tsunami',
            power: 40,
            accuracy: 100,
            name: 'Tsunami',
            type: WATER,
        },
        rugido: {
            id: 'rugido',
            power: 40,
            accuracy: 100,
            name: 'Rugido',
            type: FIGHTING,
        },
        eraDoGelo: {
            id: 'eraDoGelo',
            power: 60,
            accuracy: 80,
            name: 'Era do Gelo',
            type: ICE,
        },
        reprovacaoEmCalculo: {
            id: 'reprovacaoEmCalculo',
            power: 80,
            accuracy: 40,
            name: 'Reprovação em Cálculo',
            type: NORMAL,
          },
          aguaNoPC: {
            id: 'aguaNoPC',
            power: 40,
            accuracy: 100,
            name: 'Jogar água no PC do amiguinho',
            type: WATER,
          },
          segmentationFault: {
            id: 'segmentationFault',
            power: 60,
            accuracy: 70,
            name: 'Segmentation Fault',
            type: ELETRIC,
          },
          transformarEmMembroDoGema: {
            id: 'transformarEmMembroDoGema',
            power: 80,
            accuracy: 60,
            name: 'Transformar em membro do GEMA',
            type: ELETRIC,
          }
    }, 
    level2: {
        cometa: {
            id: 'cometa',
            power: 40,
            accuracy: 100,
            name: 'COMETÃO',
            type: ROCK,
        },
        reprovacaoEmCalculo: {
            id: 'reprovacaoEmCalculo',
            power: 80,
            accuracy: 40,
            name: 'Reprovação nas SMAs',
            type: NORMAL,
          },
          aguaNoPC: {
            id: 'aguaNoPC',
            power: 40,
            accuracy: 100,
            name: 'Jogar Caju no PC do amiguinho',
            type: WATER,
          },
          segmentationFault: {
            id: 'segmentationFault',
            power: 60,
            accuracy: 70,
            name: 'Tela azul Do Windows',
            type: ELETRIC,
          },
          transformarEmMembroDoGema: {
            id: 'transformarEmMembroDoGema',
            power: 80,
            accuracy: 60,
            name: 'Transformar em COORDENADOR do GEMA',
            type: ELETRIC,
          }
    }
}

//Receive a player and a id attack and attach the attack to the player
function attachAttackToPlayer(player, attack) {
    player.setAttack(ATTACKS.level1[attack]);
} 

//Receive a player and upgrade their attacks
function upgradeAttackPlayer(round, player) {
    //Gets the attacks in array format
    Object.values(player.getAttacks()).map((attack) => {
        //Select a new attack in ATTACKS object in a certain level 
        let level = ATTACKS['level'+round];
        if(level != undefined) {
            let upgradedAttack = level[attack.id];

            //If the attack doesn't have a evolution, does'nt upgrade
            if(upgradedAttack == undefined) {
                return;
            }

            player.setAttack(upgradedAttack);
        }
    })
}