process.env.NTBA_FIX_319 = true; // Silences an annoying error message.
const TelegramBot = require('node-telegram-bot-api');
const jokempo = require('./jokempo');
const randomPhrases = require('./random-phrases');

// replace the value below with the Telegram token you receive from @BotFather
const token = require('./token');

if (token === 'YOUR ACCESS TOKEN HERE') {
	console.log('You forgot to replate the access token!!! Properly read the README before continuing >:(');
	process.exit(-1);
}

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/help/, async (msg) => {
	bot.sendMessage(msg.chat.id, 
		"Bot realizado no Desafio da Quarentena do USPCodeLab Sanca.\n\nComandos:\n/jokempo - Inicia o jogo Pedra, Papel e Tesoura contra o bot.\n/help - Envia essa mensagem.\n\nO código fonte está disponível no GitHub e pode ser acessado <a href='https://github.com/magrinibruna/desafios-quarentena/tree/master/Desafio 6'>aqui</a>.",
		{parse_mode: "HTML"});
})

// Listen for any kind of message. There are different kinds of messages.
bot.onText(/\/start/, async (msg) => {
	const chatMessage = msg.text.trim().toLowerCase();
	const chatId = msg.chat.id;
	if (chatMessage.startsWith('ola') || chatMessage.startsWith('oi')) {
		bot.sendMessage(chatId, 'Olá! Como vai o seu dia?');
	} else if (jokempo.main(bot, chatId, chatMessage)) {
		return;
	} else {
		randomPhrases.writeRandomPhrase(bot, chatId);
	}
});

console.log('Fetching data...');
bot.getMe().then(me => {
	console.log(`I'm ready to serve! Talk to me on @${me.username}`);
	console.log(`or visit this link: https://t.me/${me.username}`);
});