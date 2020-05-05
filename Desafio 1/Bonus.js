/*
Each object matches to the type of the attack
Their objects matches the type of opponent (that will be attack) and contains how much bonus will get
*/
let attackEletric = {};
let attackWater = {};
let attackNormal = {};
let attackFighting = {};
let attackRock = {};
let attackIce = {};

//Initializing to 0 each bonus
initializeAttack(attackEletric);
initializeAttack(attackWater);
initializeAttack(attackNormal);
initializeAttack(attackFighting);
initializeAttack(attackRock);
initializeAttack(attackIce);

//Initializing that the attack of type ELETRIC will have a bonus of 5 when the opponent is type WATER
attackEletric[WATER] = {
    bonus: 5,
}
//Initializing that the attack of type ROCK will have a bonus of 10 when the opponent is of the type ELETRIC
attackRock[ELETRIC] = {
    bonus: 10
}
attackRock[WATER] = {
    bonus: 5
}
attackNormal[ROCK] = {
    bonus: 100
}

//Initializing that every type will have a bonus 0
function initializeAttack(attack) {
    ALL.map((type) => {
        attack[type] = {
            bonus: 0
        }
    })
}

//Function check's if the attack will get any bonus because of type of opponent and return the bonus
function pickBonusAttack(typeAttack, typeOpponent) {
    switch(typeAttack) {
        case ELETRIC: 
            return attackEletric[typeOpponent].bonus;
        case WATER:
            return attackWater[typeOpponent].bonus;
        case ROCK:
            return attackRock[typeOpponent].bonus;
        case NORMAL:
            return attackNormal[typeOpponent].bonus;
        case FIGHTING: 
            return attackFighting[typeOpponent].bonus;
        case ICE:
            return attackIce[typeOpponent].bonus;
        default:
            return 0;
    }

}