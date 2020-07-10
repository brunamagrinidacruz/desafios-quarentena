const express = require('express');
const process = require('process');
const cors = require('cors');

const fileName = "data.txt"
const fs = require("fs")

const app = express();
const port = process.env.PORT || 8080;

const adjectives = require('./adjectives')
const animals = require('./animals')
const colors = require('./colors')

/**
 * If a user was created but didn't send any message, 
 * when the server restart, the properties can be used again.
 */
/*!< It will store all the adjectives already allocated to someone */
/** @type { string[] } */
const dictionaryAdjectives = [];
/*!< It will store all the animals already allocated to someone */
const dictionaryAnimals = [];
/*!< It will store all the colors already allocated to someone */
/** @type { string[] } */
const dictionaryColors = [];

/**
* @typedef {{
	text: string,
	time: string,
	sender: { name: string, color: string },
}} Message This is the type a message should assume. */

/** @type { Message[] } */
const messages = [];
let nextId = 1; /*!< Represents the next id that should be used */

/*!< Reading the file synchronous */
const data = fs.readFileSync(fileName, {encoding:'utf8', flag:'r'})
const messagesString = data.split("\n");
/*!< Add each message to the array of messages */
messagesString.forEach((messageString) => {
	if(messageString != "") {
		/**
		 * Message format: <id>|<time>|<text>|<name>,<color>
		 * Example: 1|10/07/2020 - 13:29:39|Ola!|Embarrassed Estrela Mountain Dog,darkcyan
		 */
		const messageArray = messageString.split("|");
		const senderArray = messageArray[3].split(",")
		
		/*!< Adding the name and the color already used to the dictionary */
		const adjective = senderArray[0].substring(0, senderArray[0].indexOf(" "));
		if(!dictionaryAdjectives.includes(adjective)) dictionaryAdjectives.push(adjective);
		const animal = senderArray[0].substring(senderArray[0].indexOf(" ") + 1, senderArray[0].length);
		if(!dictionaryAnimals.includes(animal)) dictionaryAnimals.push(animal);
		const color = senderArray[1];
		if(!dictionaryColors.includes(color)) dictionaryColors.push(color);

		const message = {
			id: parseInt(messageArray[0]),
			text: messageArray[2],
			time: messageArray[1],
			sender: { name: senderArray[0], color: senderArray[1] }
		}
		messages.push(message)
		nextId++;
	}
})

app.use(cors());
app.use(express.json());

app.get('/messages', (req, res) => {
	res.send(messages);
});

app.post('/messages', (req, res) => {
	req.body.id = nextId; /*!< Set a id to the message */
	messages.push(req.body);
	/*!< Writing in the file the new message */
	fs.appendFile(
		fileName, 
		`${nextId}|${req.body.time}|${req.body.text}|${req.body.sender.name},${req.body.sender.color}\n`,
		(error) => { if(error) console.error(error) 
	});
	nextId++;
	res.send({});
});

/*!< It will return a new name and color */
app.get('/user', (req, res) => {
	/** @argument { any[] } arr */
	function randomItemFromArray (arr) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	/*!< Getting a adjactive, animal and color until find three that it was never used. */
	let adjective = randomItemFromArray(adjectives);
	while(dictionaryAdjectives.includes(adjective)) adjective = randomItemFromArray(adjectives);
	dictionaryAdjectives.push(adjective);
	let animal = randomItemFromArray(animals);
	while(dictionaryAnimals.includes(animal)) animal = randomItemFromArray(animals);
	dictionaryAnimals.push(animal)
	let color = randomItemFromArray(colors);
	while(dictionaryColors.includes(color)) color = randomItemFromArray(colors);
	dictionaryColors.push(color);

	const newMyself = { name: `${adjective} ${animal}`, color }
	
	res.send(newMyself);
})

app.listen(port, () => console.log(`Ready! Server listening on port ${port}`));