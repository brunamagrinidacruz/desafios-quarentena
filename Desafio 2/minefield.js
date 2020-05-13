// Cell class declaration
//A cell is a block in the game
class Cell {
	constructor (root, x, y, map) {
    // Create a div element
		const element = document.createElement('div');
    // Add class cell and hidden to the created div element
		element.classList.add('cell', 'hidden');
    // Append div on root element
		root.appendChild(element);

		element.addEventListener('click', () => map.cellLeftClick(this));
		element.addEventListener('contextmenu', event => {
			event.preventDefault();
			map.cellRightClick(this);
			return false;
		});

		this.element = element;
		this.visited = false;
		this.isFlagged = false;
		this.isBomb = false;
		this.value = 0;
		this.x = x;
		this.y = y;
	}

	reveal () {
		if (this.visited) return;
    	// Replace class hidden with class revealed on the div element
		this.element.classList.replace('hidden', 'revealed');
		if (this.isBomb) {
			this.element.classList.add('bomb');
		} else {
			this.element.innerText = this.value;
			this.element.style.color = CellColors[this.value] || 'black';
		}
		this.visited = true;
	}

	revealFlag() {
		this.element.classList.remove('flag');
		this.element.classList.replace('hidden', 'revealed');
		this.element.innerText = 'X';
		this.element.style.color = 'red';
	}


// *************************************************************************************
// Here you need to implement toggleFlag function that depending on isFlagged variable
// will apply or remove the css class 'flag' from the this instantite element
// and will invert the flag
// (This function is called inside cellRightClick function that are in the Map class,
// you dont need to worry with that)
// *************************************************************************************
	toggleFlag() {
		if(!this.isFlagged) {
			this.element.classList.add("flag");
			this.isFlagged = true;
		} else {
			this.element.classList.remove("flag");
			this.isFlagged = false;
		}
	}
		
}

class Map {
	constructor (root, width = 50, height = 30, numberOfBombs = 300, lifes = 1) {
		this.cells = [];
		this.width = width;
		this.height = height;
		this.bombCount = numberOfBombs;
		this.lifes = lifes;
		this.updateLife(lifes);
		this.hasMapBeenClickedYet = false;
		this.isGameOver = false;
		this.visibleCells = 0;

		for (let row = 0; row < height; row ++) {
			this.cells.push([]);
			for (let column = 0; column < width; column ++) {
				this.cells[row].push(new Cell(root, column, row, this));
			}
		}

		root.style.gridTemplateColumns = `repeat(${width}, max-content)`;
	}

	//Update life html
	updateLife(life) {
		lifes = document.getElementById("lifes");
		lifes.innerText = `Lifes: ${life}`;
	}

	// Used to verify if the given position is outside the map bounds
	doesPositionExist (x, y) {
		if (x < 0 || y < 0 || x >= this.width || y >= this.height) return false;
		return true;
	}

	// Iterates over each neighbor of a cell, calling `callback` with a cell as argument.
	forEachNeighbor (cell, callback) {
		for (let newY = cell.y - 1; newY <= cell.y + 1; newY ++) {
			for (let newX = cell.x - 1; newX <= cell.x + 1; newX ++) {
				if (!this.doesPositionExist(newX, newY)) continue;
				if (newX === cell.x && newY === cell.y) continue;
				callback(this.cells[newY][newX]);
			}
		}
	}

	countBombsAroundCell (cell) {
		let bombs = 0;
		this.forEachNeighbor(cell, neighbor => {
			if (neighbor.isBomb) bombs ++;
		});
		return bombs;
	}

	placeAllNumbersInMap () {
		for (let row = 0; row < this.height; row ++){
			for (let column = 0; column < this.width; column ++){
				const cell = this.cells[row][column];
				if (cell.isBomb) continue;
				cell.value = this.countBombsAroundCell(cell);
			}
		}
	}

	// Finds proper positions to bombs
	placeAllBombsInMap (clickX, clickY) {
		const generateBombSomewhere = async () => {
			let x, y;
			do {
				x = Math.floor(Math.random() * this.width);
				y = Math.floor(Math.random() * this.height);
			} while (
				this.cells[y][x].isBomb ||
				(Math.abs(x - clickX) <= 1 && Math.abs(y - clickY) <= 1)
			);

			this.cells[y][x].isBomb = true;
		}

		for (let i = 0; i < this.bombCount; i ++) {
			generateBombSomewhere();
		}
	}

	// Funtion called when player left clicks a cell
	cellLeftClick (clickedCell) {
		if (this.isGameOver) return;
		if (clickedCell.isFlagged) return;
		if (clickedCell.visited) return;
		if (!this.hasMapBeenClickedYet) {
			this.placeAllBombsInMap(clickedCell.x, clickedCell.y);
			this.placeAllNumbersInMap();
			this.hasMapBeenClickedYet = true;
		}
		if (clickedCell.isBomb) {
			//If the lifes is bigger than 1, there is still a chance
			if(this.lifes > 1) {
				clickedCell.reveal();
				this.lifes--;
				this.updateLife(this.lifes);
				return;
			} else {
				clickedCell.element.style.backgroundColor = 'red';
				this.updateLife("0");
				this.gameOver();
				return;
			}
		}
		clickedCell.reveal();
		this.visibleCells ++;
		if (this.didPlayerWin()) {
			setTimeout(() => alert('Congratulations, you won!'));
		}

		// If the cell is empty, open all surrounding cells.
		if (clickedCell.value === 0 && !clickedCell.isFlagged) {
			this.forEachNeighbor(clickedCell, cell => this.cellLeftClick(cell));
		}
	}

	didPlayerWin () {
		return this.visibleCells >= this.width * this.height - this.bombCount;
	}

	cellRightClick (clickedCell) {
		if (this.isGameOver) return;
		if (clickedCell.visited) return;
		clickedCell.toggleFlag();
	}

	gameOver () {
		for (let row = 0; row < this.height; row ++) {
			for (let column = 0; column < this.width; column ++) {
				const cell = this.cells[row][column];
				if (cell.isBomb && !cell.isFlagged) cell.reveal();
				//If it was flagged and it wasn't a bomb, put "X"
				if(!cell.isBomb && cell.isFlagged) cell.revealFlag();
			}
		}
		this.isGameOver = true;
	}
}

//Receving the level
const url = new URL(window.location.href);
let level = url.searchParams.get("level") == null ? 0 : url.searchParams.get("level");

//If it was a wrong level, return to index.html
if(levels[level] == undefined) {
	const url = new URL(window.location.href);
	//The url is .../index.html, so I have to go to .../minefield.html
	window.location.href = url.href.replace("minefield", "index");
} else {
	// Instantiate a Map object with the properties of the level
	new Map(document.getElementById('root'), levels[level].width, levels[level].height, levels[level].numberOfBombs, levels[level].lifes);
}

