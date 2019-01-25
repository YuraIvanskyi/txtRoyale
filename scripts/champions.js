function Champion(name, attack, hp, resist, defence=0, icon) {
    this.attack = attack;
    this.hp = hp;
    this.resist = resist;
    this.name = name;
    this.hpRegen = 0;
    this.icon = icon;
    this.defence = defence;
    this.hitOpponent = function (opponent) {
        if(this.hp <= 0)
            return;
        outputToScreen(`{<img class ="battle-log-icon" src="img/avatars/${this.icon}.png">}[${this.name}] with [<img class ="battle-log-icon" src="img/icons/sword.png">${this.attack}] hits {<img class ="battle-log-icon" src="img/avatars/${opponent.icon}.png">}[${opponent.name}] with [${opponent.hp}<img class ="battle-log-icon" src="img/icons/favorite-heart-button.png">]`)
        var hitPower = undefined;
        if(this.attack - opponent.resist < 0)
            hitPower = 0;
        else 
            hitPower = this.attack - opponent.resist;
        opponent.hp = opponent.hp - hitPower;
        outputToScreen(`{<img class ="battle-log-icon" src="img/avatars/${this.icon}.png">}[${this.name}] deals [<img class ="battle-log-icon" src="img/icons/energy.png">${hitPower}] to {<img class ="battle-log-icon" src="img/avatars/${opponent.icon}.png">}[${opponent.name}], [<img class ="battle-log-icon" src="img/icons/fist.png">${opponent.resist}]`)
        outputToScreen(`{<img class ="battle-log-icon" src="img/avatars/${opponent.icon}.png">}[${opponent.name}]:[${opponent.hp}<img class ="battle-log-icon" src="img/icons/favorite-heart-button.png">] left.`)
    }
    this.applyPermanentBuffs = function() {
        //TODO in future
    }
    this.toString = function() {
        return `{<img class ="battle-log-icon" src="img/avatars/${this.icon}.png">}[${this.name}] : [${this.hp}<img class ="battle-log-icon" src="img/icons/favorite-heart-button.png">],[<img class ="battle-log-icon" src="img/icons/sword.png">${this.attack}], [<img class ="battle-log-icon" src="img/icons/fist.png">${this.resist}]`
    }
}


function fight(champions){
    var battlefield = champions;
    
    outputToScreen('Start with stats:',true)
    for(i in battlefield) {
        outputToScreen(battlefield[i]);
    }
    var round = 1;
    
    //while(battlefield.length !== 1) {
        var repeater = setInterval(function(){
            outputToScreen(`Round ${round}!`,true)
            for(unit in battlefield) {
                var championThatHits = battlefield[parseInt(unit)];
                if(parseInt(unit) === battlefield.length - 1)
                    championThatHits.hitOpponent(battlefield[0])
                else 
                    championThatHits.hitOpponent(battlefield[parseInt(unit)+1])
            }
            while(battlefield.some(e => e.hp <= 0)){
                for(i in battlefield) {
                    if(battlefield[i].hp <= 0)
                        battlefield.splice(i,1)
                }
            }
            outputToScreen('Survived:',true)
            for(i in battlefield) {
                outputToScreen(battlefield[i]);
            }
            outputToScreen('------------------------------------------------')
            round++;
            document.getElementById('siteAds').scrollBy(0, 1000);
            if(battlefield.length === 1)
                clearInterval(repeater);
            },500);
    //}
}
function delay(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
  }
function outputToScreen(value, withBreaks=false) {
    if(withBreaks)
        document.getElementById('siteAds').innerHTML += `<br><br>${value}<br>`;
    else
        document.getElementById('siteAds').innerHTML += `<br>${value}`;
}