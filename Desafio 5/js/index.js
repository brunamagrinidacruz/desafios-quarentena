// This is the container of all Entities
const rootElement = document.getElementById('root');
/*!< The score element. It will show the pointing of the user */
const scoreElement = document.getElementById('score');
/*!< The time element. It will show time counter of the game */
const timeElement = document.getElementById('time');

const grid = new Grid(rootElement, 10, 10, scoreElement, timeElement);