class Player {
    constructor(name, type, totalHp, hp, elementHealthBar, image) {
        this.name = name;
        this.type = type;
        this.totalHp = totalHp;
        this.hp = hp;
        this.elementHealthBar = elementHealthBar;
        this.image = image;
        this.attacks = {};
    }

    getImage(index) {
        return this.image[index];
    }

    getAttack(name) {
        return this.attacks[name];
    }

    getAttackByIndex(index) {
        return Object.values(this.attacks)[index];
    }

    getAttacks() {
        return this.attacks;
    }

    setAttack(attack) {
        this.attacks[attack.id] = attack; 
    }

    getHp() {
        return this.hp;
    }

    getType() {
        return this.type;
    }

    //Choose a attack randomly
    randomlyAttack() {
        const possibleAttacks = Object.values(this.attacks);
        return possibleAttacks[Math.floor(Math.random() * possibleAttacks.length)];
    }

    canAttack(accuracy) {
        return !(Math.floor(Math.random() * 100) > accuracy);
    }

    //Return true if the player dies
    updatePlayerHp(newHP) {
        this.hp = Math.max(newHP, 0);
        const barWidth = (this.hp / this.totalHp) * 100;
        this.elementHealthBar.style.width = barWidth + '%';
        return (this.hp === 0);
    }

    attackOpponent(opponent, attack, bonus = 0) {
        const gameIsOver = opponent.updatePlayerHp(opponent.getHp() - (attack.power + bonus));
        return gameIsOver;
    }

}