function Champion(name, attack, hp, resist, h) {
    this.attack = attack;
    this.hp = hp;
    this.resist = resist;
    this.name = name;
    this.hpRegen = 
    this.hitOpponent = function (opponent) {
        console.log(`[${this.name}] with attack [${this.attack}] wants to hit [${opponent.name}] with hp [${opponent.hp}]`)
        var hitPower = undefined;
        if(this.attack - opponent.resist < 0)
            hitPower = 0;
        else 
            hitPower = this.attack - opponent.resist;
        
        opponent.hp = opponent.hp - hitPower;
        console.log(`[${opponent.name}]:[${opponent.hp}] HP left.`)
    }
    this.applyPermanentBuffs = function() {

    }
}
var champion1 = new Champion('BountyHunter',20,105,5);
var champion2 = new Champion('Fairy',10,55,3);
var champion3 = new Champion('Demon',25,135,9);
var champion4 = new Champion('Angel',25,120,8);
var champion5 = new Champion('Goblin',15,75,1);

function fight(champions){
    var battlefield = champions;
    
    console.log('Start with stats:')
    for(i in battlefield) {
        console.log(battlefield[i]);
    }
    var round = 1;
    while(battlefield.length !== 1) {
        console.log(`Round ${round}!`)
        for(unit in battlefield) {
            var championThatHits = battlefield[parseInt(unit)];
            if(championThatHits.hp <= 0) {
                continue;
            }
            else {
                
                if(parseInt(unit) === battlefield.length - 1) {
                    championThatHits.hitOpponent(battlefield[0])
                }
                else {
                    championThatHits.hitOpponent(battlefield[parseInt(unit)+1])
                }
            }
        }
        
        
        for(i in battlefield) {
            if(battlefield[i].hp <= 0)
                battlefield.splice(i,1)
        }
        console.log('Survived:')
        for(i in battlefield) {
            console.log(battlefield[i]);
        }
        
        round++;
    }
}
/*var ChampArray = [champion1,champion2,champion3,champion4,champion5]
fight(ChampArray)*/