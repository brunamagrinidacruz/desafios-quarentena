const express = require('express');
const process = require('process');
const cors = require('cors');

const fileName = "data.txt"
const fs = require("fs")

const app = express();
const port = process.env.PORT || 8080;

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

app.listen(port, () => console.log(`Ready! Server listening on port ${port}`));