const questionsAndAnswers = [
    {
        question: "quem é o autor?",
        answer: "A autorA é a Bruna Magrini."
    },
    {
        question: "qual o grupo de extensão mais legal?",
        answer: "USPCodeLab Sanca!"
    }, {
        question: "por que o t-rex não bate palma?",
        answer: "PORQUE ELE ESTÁ EXTINTO HEHEHEH"
    }
]

/**
* Verify if the bot has a answer to the quesiton and send the answer if true.
* @argument { import('node-telegram-bot-api') } bot
* @argument { number } chatId
* @argument { string } message
* @returns { boolean } A flag to indicate whether the message was used or not.
*/
function answer(bot, chatId, message) {
    for(let i in questionsAndAnswers) {
        if(message == questionsAndAnswers[i].question) {
            bot.sendMessage(chatId, questionsAndAnswers[i].answer);
            return true;
        }
    }
    return false;
}

module.exports = {
    answer
}