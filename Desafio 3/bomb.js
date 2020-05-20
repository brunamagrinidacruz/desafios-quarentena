const BOMB_SIZE = 100;
const BOMB_SPEED = 0;
const BOMB_TIME_LIFE = 3000;

/**
* This is a class declaration
* This class is responsible for defining the bullets behavior.
* this class extends the MovableEntity class, which is responsible for defining physics behavior
* If you'd like to know more about class inheritance in javascript, see this link
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
*/
class Bomb extends MovableEntity {

	/**
	* @argument { HTMLDivElement } containerElement The DOM element that will contain the bullet
	* @argument { Map } mapInstance The map in which the bullet will spawn
	* @argument { Vector } direction The bullet's direction
	*/
	constructor (
		containerElement,
		mapInstance,
		direction,
		initialPosition = undefined
	) {
		// The `super` function will call the constructor of the parent class.
		// If you'd like to know more about class inheritance in javascript, see this link
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
		super(containerElement, BOMB_SIZE, initialPosition, direction.normalize().scale(BOMB_SPEED), direction);

		this.mapInstance = mapInstance;

		// This is so the map can execute the player's physics (see the `frame` function
		// in the `map.js` file
		mapInstance.addEntity(this);

		// Assigns the bullet's image to it's element
		this.rootElement.style.backgroundImage = "url('assets/explosion.svg')";
		this.rootElement.style.backgroundSize = this.size + 'px';

		this.destroy();
	}

	// If the bullet collides with an asteroid, delete the bullet.
	collided (object) {
	}

	//After 3s, asteroid will be removed
	destroy() {
		setTimeout(() => {
			this.mapInstance.removeEntity(this);
			this.delete();
		}, BOMB_TIME_LIFE);
	}
}