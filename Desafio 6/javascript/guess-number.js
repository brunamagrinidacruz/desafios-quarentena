const MAX_NUMBER = 10;
let numberToGuess = 0;
let isPlaying = false;

/**
* Just a simple sleep function. It will return a promisse that will resolve itself
* in `time` milisseconds.
* @argument { number } time The time in Milisseconds the function will wait.
* @returns { Promise<void> }
*/
function sleep (time) {
	return new Promise(resolve => {
		setTimeout(() => resolve(), time);
	});
}

/** 
 * Generetes a random number between 1 and MAX_NUMBER
 */
function randomNumber() {
    return Math.floor(Math.random() * MAX_NUMBER) + 1;
}

/**
 * This functions inititialize the game. 
 * Pick a random number to the user try to guess.
 * Set a flag that indicate the game is being playing;
 * @argument { import('node-telegram-bot-api') } bot
 * @argument { number } chatId
*/
async function startPlaying(bot, chatId) {
    await bot.sendMessage(chatId, 'Eu vou pensar em um número e você deve tentar adivinhar, ok?');
    await sleep(2000);
    await bot.sendMessage(chatId, 'Hummmmmmmmmmmm...');
    await sleep(1000);
    numberToGuess = randomNumber();
    await bot.sendMessage(chatId, `Certo, pensei em um número entre 1 e ${MAX_NUMBER}. Tente chutar!`);
    isPlaying = true;
}

/**
 * Verify if the player guess is equal to the bot number.
 * Returns a message to the user with the result of the game.
* @argument { import('node-telegram-bot-api') } bot
* @argument { number } chatId
* @argument { string } message
*/
async function checkIfThePlayerWin(bot, chatId, message) {
    if(numberToGuess == message)
        bot.sendMessage(chatId,`Você acertou! O número era mesmo ${numberToGuess}.`);
    else
        bot.sendMessage(chatId, `Nops! O número que eu escolhi foi o ${numberToGuess}.`);
    isPlaying = false;
}

/**
* Decides when to start a game and when to send the answer to the user.
* @argument { import('node-telegram-bot-api') } bot
* @argument { number } chatId
* @argument { string } message
* @returns { boolean } A flag to indicate whether the message was used or not.
*/
function main (bot, chatId, message) {
    if(isPlaying) {
        checkIfThePlayerWin(bot, chatId, message);
        return true;
    } else if(message === '/number') {
        startPlaying(bot, chatId)
        return true;
    } else {
        return false;
    }
}

module.exports = {
    main
}