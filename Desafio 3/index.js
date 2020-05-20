// This is the container of all movableEntities
const movableEntityContainer = document.getElementById('movable-entity-container');
const scoreElement = document.getElementById("score");
const timeSpentElement = document.getElementById("time-spent");
const bombElement = document.getElementById("bomb")
const moveElement = document.getElementById("move");

const TIME_SPENT_TEXT = "Time: "
const BOMB_TEXT = "Amount Bombs Availables: "

// creates the single only map instance in the game.
// There should be only one map in the game, so it is a Singleton class.
// If you'd like to know more about the singleton pattern, see this link:
// https://en.wikipedia.org/wiki/Singleton_pattern
const map = new Map(movableEntityContainer, scoreElement);

// creates the single only player instance in the game.
const player = new Player(
	movableEntityContainer,
	map,
	gameOver,
);

// This is the game frame function. It is responsible for updating everything in the game.
function frame () {
	map.frame();

	// if the player is pressing one of the keys, call the turn function
	if (pressedKeys['ArrowLeft']) player.turn(-1);
	if (pressedKeys['ArrowRight']) player.turn(1);
	if (pressedKeys['a']) player.move("left");
	if (pressedKeys['d']) player.move("right");
	if (pressedKeys['w']) player.move("top");
	if (pressedKeys['s']) player.move("bottom");
}

// This is a dictionary that will hold the keys that are being held down at the time.
// If you'd like to know more about dictionaries, see this link:
// https://pietschsoft.com/post/2015/09/05/javascript-basics-how-to-create-a-dictionary-with-keyvalue-pairs
const pressedKeys = {};

// This function will run every time the player presses a key
document.body.addEventListener('keydown', event => {
	// if that key is the spacebar, the player will shoot.
	if (event.key === ' ' && !pressedKeys[' ']) player.shoot();

	// add the pressed key to the pressedKey dictionary
	pressedKeys[event.key] = true;
});

// This function will run every time the player releases a key
document.body.addEventListener('keyup', event => {
	// removes the pressed key to the pressedKey dictionary
	delete pressedKeys[event.key];
});

//When the user click, it will spawn a bomb that will have a duration of 3s
//And will protect the spaceship
//The player has a limited amount of bombs
let canSpawnBown = true;
document.body.addEventListener("click", event => {
	if(isGameOver) return;
	
	let amountAvalibleBomb = parseInt(bombElement.innerText.split(":")[1])
	
	//There is no bombs avalibles
	if(amountAvalibleBomb <= 0) return;
	
	if(canSpawnBown) {
		canSpawnBown = false;
		player.bomb();

		amountAvalibleBomb--;
		bombElement.innerText = `${BOMB_TEXT}${amountAvalibleBomb}`
		
		//A bomb just can be spawned again when the other first bomb exploded
		setTimeout(() => {
			canSpawnBown = true;
		}, BOMB_TIME_LIFE)
	}
})

// Registers the frame function to run at every frame.
// if you'd like to know more about intervals, see this link
// https://javascript.info/settimeout-setinterval
const intervalHandler = setInterval(frame);

let isGameOver = false;

// This is the function that will end the game
function gameOver () {
	isGameOver = true;
	// This will unregister the frame function, so nothing else will be updated
	clearInterval(intervalHandler);
	alert('Você perdeu');
}

//This function format the number to have two digits
function formatTwoDigitsNumber(number) {
	return number < 10 ? "0" + number : number;
}

function canPlayerMove() {
	//The chance the player move is 1/15
	return Math.floor(Math.random() * 15) == 1;
}

//Controlls properties moviment player
let playerMove = {
	canMove: false,
	durantionMovement: 15,
	timeStopMove: 0
};
//Function responsible to handle the counter until the game is over
function counter() {
	if(isGameOver) return;
	setTimeout(() => {
		let second = parseInt(timeSpentElement.innerHTML.split(":")[3]);
		let minut = parseInt(timeSpentElement.innerHTML.split(":")[2]);
		let hour = parseInt(timeSpentElement.innerHTML.split(":")[1]);

		second++;
		if(second > 59) {
			//Each minute, will receaive a bomb
			let amountAvalibleBomb = parseInt(bombElement.innerText.split(":")[1])
			amountAvalibleBomb++;
			bombElement.innerText = `${BOMB_TEXT}${amountAvalibleBomb}`

			minut++;
			second = 0;
		}

		if(minut > 59) {
			hour++;
			minut = 0;
		}

		//If player can't move, check if he can now 
		//If player can move, check if it's time to stop
		if(!playerMove.canMove) {
			if(canPlayerMove()) {
				playerMove.canMove = true;
				playerMove.durantionMovement = 15;
				playerMove.timeStopMove = (second + 15) % 59;
				player.updatePermissionMove(true, moveElement);
				moveElement.innerText = `You can move for ${playerMove.durantionMovement} second(s)`;
			}
		} else {
			playerMove.durantionMovement--;
			moveElement.innerText = `You can move for ${playerMove.durantionMovement} second(s)`;
			if(second == playerMove.timeStopMove) {
				moveElement.innerText = "You can't move"
				player.updatePermissionMove(false, moveElement);
				playerMove.canMove = false;
			}
		}

		timeSpentElement.innerText = TIME_SPENT_TEXT + `${formatTwoDigitsNumber(hour)}:${formatTwoDigitsNumber(minut)}:${formatTwoDigitsNumber(second)}`;
		counter();
	}, 1000);
}
counter();