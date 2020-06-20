const questionsAndAnswers = [
    {
        question: "quem é o autor?",
        answer: "A autorA é a Bruna Magrini.",
        photo: {
            link: "https://media-exp1.licdn.com/dms/image/C4E03AQGtsI00xXwRxg/profile-displayphoto-shrink_200_200/0?e=1597881600&v=beta&t=829fxtnHxAIkHxyWG3fshoAIcDAUsSnyo7rM8Ypa2ec",
            caption: "Essa lindeza aqui o/"
        }
    },
    {
        question: "qual o grupo de extensão mais legal?",
        answer: "USPCodeLab Sanca!"
    }, {
        question: "por que o t-rex não bate palma?",
        answer: "PORQUE ELE ESTÁ EXTINTO HEHEHEH",
        photo: {
            link: "https://www.ahnegao.com.br/wp-content/uploads/2018/10/7-5.jpg"
        }
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
        let questionAnswer = questionsAndAnswers[i];
        if(message == questionAnswer.question) {
            bot.sendMessage(chatId, questionAnswer.answer).then(() => {
                if(questionAnswer.photo)
                    bot.sendPhoto(chatId, questionAnswer.photo.link, { caption: questionAnswer.photo.caption || "" })
            });
            return true;
        }
    }
    return false;
}

module.exports = {
    answer
}