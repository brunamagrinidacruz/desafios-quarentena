const BULLET_SIZE = 10;
const BULLET_SPEED = 1;

/**
* This is a class declaration
* This class is responsible for defining the bullets behavior.
* this class extends the MovableEntity class, which is responsible for defining physics behavior
* If you'd like to know more about class inheritance in javascript, see this link
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
*/
class Bullet extends MovableEntity {

	/**
	* @argument { HTMLDivElement } containerElement The DOM element that will contain the bullet
	* @argument { Map } mapInstance The map in which the bullet will spawn
	* @argument { Vector } direction The bullet's direction
	*/
	constructor (
		containerElement,
		mapInstance,
		direction
	) {
		// The `super` function will call the constructor of the parent class.
		// If you'd like to know more about class inheritance in javascript, see this link
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends
		super(containerElement, BULLET_SIZE, undefined, direction.normalize().scale(BULLET_SPEED), direction);

		this.mapInstance = mapInstance;

		// This is so the map can execute the player's physics (see the `frame` function
		// in the `map.js` file
		mapInstance.addEntity(this);

		//The chance the bullet to be special is 1/5
		const especialBullet =  Math.floor(Math.random() * 5) == 1;

		// Assigns the bullet's image to it's element
		this.rootElement.style.backgroundImage = especialBullet ? "url('assets/bullet-bonus.svg')" : "url('assets/bullet.svg')";
		this.rootElement.style.backgroundSize = this.size + 'px';
		// Set the damage that the bullet will cause. It represents the number of lifes
		//That will take from asteroid. Could be 1 to 3
		this.damage = especialBullet ? (Math.floor(Math.random() * 3) + 1) : 1;		
	}

	// If the bullet collides with an asteroid, delete the bullet.
	collided (object) {
		if (object instanceof Asteroid) {
			this.mapInstance.removeEntity(this);
			this.delete();
		}
	}

	getDamage() {
		return this.damage;
	}
}