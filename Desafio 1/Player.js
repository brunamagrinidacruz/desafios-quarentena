class Player {
    constructor(_name, _totalHp, _hp, _attacks, _elementHealthBar) {
        this.name = _name;
        this.totalHp = _totalHp;
        this.hp = _hp;
        this.attacks = _attacks;
        this.elementHealthBar = _elementHealthBar;
    }

    getAttack(_name) {
        return this.attacks[_name];
    }

    getHp() {
        return this.hp;
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

    attackOpponent(attack, opponent) {
        const gameIsOver = opponent.updatePlayerHp(opponent.getHp() - attack.power);
        return gameIsOver;
    }

}