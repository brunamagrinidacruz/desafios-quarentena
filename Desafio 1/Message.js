const EN = "English";
const BR = "Portuguese";

const languages = [EN, BR]

let used;
let isTheWinner;
let closeThisAlertTo;
let playAgain;
let nextLevel;
let butMissed;
let chooseOneAttack;
let isParalized;

function initializeMessage(language) {
    switch(language) {
        case EN:
            used = "used"
            isTheWinner = "is the winner!";
            closeThisAlertTo = "Close this alert to"
            playAgain = "play again";
            nextLevel = "go to the next round"
            butMissed = "but missed!";
            chooseOneAttack = "Please choose one attack"
            isParalized = "is paralized"
            break;
        case BR: 
            used = "usou";
            isTheWinner = "é o ganhador!"
            closeThisAlertTo = "Feche esta janela para"
            playAgain = "jogar novamente";
            nextLevel = "ir para o próximo round"
            butMissed = "mas errou!"
            isParalized = "está paralizado"
            chooseOneAttack = "Por favor, escolha um ataque!"
            break;
    }
}

initializeMessage(EN);

