const EN = "English";
const BR = "Portuguese";

const languages = [EN, BR]

let used;
let isTheWinner;
let closeThisAlertToPlayAgain;
let butMissed;
let chooseOneAttack;

function initializeMessage(language) {
    console.log(language);
    switch(language) {
        case EN:
            used = "used"
            isTheWinner = "is the winner!";
            closeThisAlertToPlayAgain = "Close this alert to play again"
            butMissed = "but missed!";
            chooseOneAttack = "Please choose one attack"
            break;
        case BR: 
            used = "usou";
            isTheWinner = "é o ganhador!"
            closeThisAlertToPlayAgain = "Feche esta janela para jogar novamente"
            butMissed = "mas errou!"
            chooseOneAttack = "Por favor, escolha um ataque!"
            break;
    }
}

initializeMessage(EN);

