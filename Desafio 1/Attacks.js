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
            power: 110,
            accuracy: 80,
            name: 'Era do Gelo',
            type: ICE,
        },
        reprovacaoEmCalculo: {
            id: 'reprovacaoEmCalculo',
            power: 40,
            accuracy: 100,
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
            power: 80,
            accuracy: 70,
            name: 'Segmentation Fault',
            type: ELETRIC,
          },
          transformarEmMembroDoGema: {
            id: 'transformarEmMembroDoGema',
            power: 110,
            accuracy: 80,
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
    }
}

//Receive a player and a id attack and attach the attack to the player
function attachAttackToPlayer(player, attack) {
    player.setAttack(ATTACKS.level1[attack]);
} 

//Receive a player and upgrade their attacks
function upgradePlayer(round, player) {
    //Gets the attacks in array format
    Object.values(player.getAttacks()).map((attack) => {
        //Select a new attack in ATTACKS object in a certain level 
        let upgradedAttack = ATTACKS['level'+round][attack.id];
        
        //If the attack doesn't have a evolution, does'nt upgrade
        if(upgradedAttack == undefined) {
            return;
        }

        player.setAttack(upgradedAttack);
    })
}