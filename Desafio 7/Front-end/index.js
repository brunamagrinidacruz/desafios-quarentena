const serverAddress = 'http://localhost:8081';
const messageFormElement = document.getElementById('message-form');
const messagesContainerElem = document.getElementById('messages-container');
const messageTemplateElem = document.getElementById('message-template');

/**
* @typedef {{
	text: string,
	time: string,
	sender: { name: string, color: string },
}} Message This is the type a message
* should assume. */

/**
* @type { Message[] }
* This variable will hold all messages that were already
* rendered to the client.
*/
const renderedMessages = [];

let myself;
(async () => {
	// This part is to store the "self" into the localstorage. This is to allow for
	// the user to come back as themselves later.
	const currentMyself = localStorage.getItem('self-info');
	if (currentMyself) {
		myself = JSON.parse(currentMyself);
		return;
	}

	/*!< Getting from the server the new users informations */
	try {
		const response = await fetch(`${serverAddress}/user`, {
			headers: { 'Content-Type': 'application/json' },
		})
		myself = await response.json();
		localStorage.setItem('self-info', JSON.stringify(myself));
	} catch (e) {
		console.error(e);
	}

})();

// Function executed when the user "sends" the message
messageFormElement.addEventListener('submit', event => {
	event.preventDefault();

	// Selects the input from the form
	const messageElement = messageFormElement.querySelector('input[name=message-value]');
	const messageText = messageElement.value;
	if (!messageText) return;

	const date = new Date();
	const message = { 
		text: messageText, 
		time: `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/${date.getMonth()+1 < 10 ? "0" + (date.getMonth()+1) : date.getMonth()+1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}`, 
		sender: myself 
	};
	sendMessageToServer(message);

	// Clears the message text input
	messageElement.value = '';
});

/**
* @argument { Message } message
*/
async function sendMessageToServer (message) {
	try {
		const response = await fetch(`${serverAddress}/messages`, {
			body: JSON.stringify(message),
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
		});
	} catch (e) {
		console.error(e);
	}
}

/**
* @argument { Message } message
* @argument { int } index
*/
function createMessageOnUI (message) {
	const messageNode = messageTemplateElem.content.cloneNode(true);
	const messageContainerElement = messageNode.querySelector('.message-container');
	const messageNameElement = messageNode.querySelector('.message-name');
	const messageTextElement = messageNode.querySelector('.message-text');
	const messageTimeElement = messageNode.querySelector('.message-time');

	messageContainerElement.setAttribute("id", message.id);
	messageNameElement.innerText = message.sender.name;
	messageNameElement.style.color = message.sender.color;
	messageTextElement.innerText = message.text;
	messageTimeElement.innerText = message.time;

	// If I was the sender, push the message element to the right
	if (message.sender.name === myself.name) {
		messageContainerElement.style.marginLeft = 'auto';
	}

	messagesContainerElem.appendChild(messageNode);
}

async function fetchMessagesFromServer () {
	if(!myself) return;

	/** @type { Message[] } */
	let data = [];
	try {
		// Note that, by deafault, the `fetch` function makes uses a `GET` request method.
		const resp = await fetch(`${serverAddress}/messages`);
		data = await resp.json();
	} catch (e) {
		console.error(e);
		return;
	}

	/**
	* Contains all messages returned from the server that were not yet rendered.
	* The ideia is that if the array of messages on the server is larger than the
	* array of messages on the client, then that means some messages are new.
	* Since the messages are placed in order on the array, you just have to get the
	* last elements of the server message's array.
	*/
	const unrenderedMessages = data.slice(renderedMessages.length);

	unrenderedMessages.forEach(newMessage => {
		createMessageOnUI(newMessage);
		renderedMessages.push(newMessage);
	});
}

setInterval(fetchMessagesFromServer, 500);

/**
 * Function executed when user click in 'Become a new user' 
 * The function will create a new name and a new color to the user (update the user).  
 * It will update the localStorage and the myself variable.
 * It will update the position of the older messages in the screen.
 **/
becomeNewUser.addEventListener('click', async (event) => {
	event.preventDefault();
	/*!< Getting new random values */
	let newMyself;
	try {
		const response = await fetch(`${serverAddress}/user`, {
			headers: { 'Content-Type': 'application/json' },
		})
		newMyself = await response.json();
		renderedMessages.forEach(message => {
			/*!< If the message was sended by the user, should be update because the user has new properties now */
			if(message.sender.name == myself.name) {
				const messageContainerElement = document.getElementById(message.id);
				messageContainerElement.style.marginLeft = ''; /*!< Sending the messages to the left side of screen */
			}
		})
		/*!< Updating the localStorage */
		localStorage.setItem('self-info', JSON.stringify(newMyself));
		/*!< Updating the new properties in the code */
		myself = newMyself
	} catch (e) {
		console.error(e);
	}
})