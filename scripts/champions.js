function Champion(name, attack, hp, resist, hpRegen=0, icon='') {
    this.attack = attack;
    this.hp = hp;
    this.resist = resist;
    this.name = name;
    this.hpRegen = hpRegen;
    this.icon = icon;
    this.hitOpponent = function (opponent) {
        outputToScreen(`[${this.name}] with attack [${this.attack}] wants to hit [${opponent.name}] with hp [${opponent.hp}]`)
        var hitPower = undefined;
        if(this.attack - opponent.resist < 0)
            hitPower = 0;
        else 
            hitPower = this.attack - opponent.resist;
        
        opponent.hp = opponent.hp - hitPower;
        outputToScreen(`[${opponent.name}]:[${opponent.hp}] HP left.`)
    }
    this.applyPermanentBuffs = function() {

    }
    this.toString = function() {
        return `[${this.name}]: [${this.hp}] <img class ="battle-log-icon" src="img/icons/hearts.png"> left.`
    }
}


function fight(champions){
    var battlefield = champions;
    
    outputToScreen('Start with stats:',true)
    for(i in battlefield) {
        outputToScreen(battlefield[i]);
    }
    var round = 1;
    while(battlefield.length !== 1) {
        outputToScreen(`Round ${round}!`,true);
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
            outputToScreen('Survived:',true)
            for(i in battlefield) {
                outputToScreen(battlefield[i]);
            }
            
            round++;
            /*if(battlefield.length === 1)
                clearInterval();*/
        
    }
}
function outputToScreen(value, withBreaks=false) {
    if(withBreaks)
        document.getElementById('siteAds').innerHTML += `<br><br>${value}<br>`;
    else
        document.getElementById('siteAds').innerHTML += `<br>${value}`;
}