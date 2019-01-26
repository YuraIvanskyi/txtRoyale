function Champion(name, attack, hp, resist, icon, regen, buff) {
    this.attack = parseInt(attack);
    this.initAttack = parseInt(attack);
    this.hp = parseInt(hp);
    this.resist = parseInt(resist);
    this.initResist = parseInt(resist);
    this.name = name;
    this.hpRegen = parseInt(regen);
    this.icon = icon;
    this.buff = buff;
    this.maxHp = parseInt(hp);
    this.debuffList = [];
    this.sleepy = false;
    this.hitOpponent = function (opponent) {
        if(this.hp <= 0 )
            return;
        this.applySelfDebuf();
        if(this.sleepy) {
            //outputToScreen(`<span class="battle-log-text-buff">{<img class ="battle-log-icon" src="img/avatars/${this.icon}.png">}[${this.name}] suffers from [<img class ="battle-log-icon" src="img/icons/sleep.png">] : skips the chance to hit.</span>`)
            return;
        }
        this.regenerate();
        outputToScreen(`<span class="battle-log-text-attack">{<img class ="battle-log-icon" src="img/avatars/${this.icon}.png">}[${this.name}] with [<img class ="battle-log-icon" src="img/icons/sword.png">${this.attack}] hits {<img class ="battle-log-icon" src="img/avatars/${opponent.icon}.png">}[${opponent.name}] with [${opponent.hp}<img class ="battle-log-icon" src="img/icons/favorite-heart-button.png">]</span>`)
        var hitPower = undefined;
        if(this.attack - opponent.resist < 0)
            hitPower = 0;
        else 
            hitPower = this.attack - opponent.resist;
        opponent.hp = opponent.hp - hitPower;
        outputToScreen(`<span class="battle-log-text-attack">{<img class ="battle-log-icon" src="img/avatars/${this.icon}.png">}[${this.name}] deals [<img class ="battle-log-icon" src="img/icons/energy.png">${hitPower}] to {<img class ="battle-log-icon" src="img/avatars/${opponent.icon}.png">}[${opponent.name}], [<img class ="battle-log-icon" src="img/icons/def.png">${opponent.resist}]</span>`)
        outputToScreen(`<span class="battle-log-text-info">{<img class ="battle-log-icon" src="img/avatars/${opponent.icon}.png">}[${opponent.name}]:[${opponent.hp}<img class ="battle-log-icon" src="img/icons/favorite-heart-button.png">] left.</span>`)
        if(Math.random()*100 <= 20) //some kind of 20% chance to use a buff-skill on opponent
            this.applyBuff(opponent);
        if(opponent.buff === 'spike') {
            var spikeStrike = parseInt(opponent.attack/3) > 0 ? parseInt(opponent.attack/3) : 1;
            this.hp -= spikeStrike;
            outputToScreen(`<span class="battle-log-text-buff">{<img class ="battle-log-icon" src="img/avatars/${this.icon}.png">}[${this.name}] suffers from [<img class ="battle-log-icon" src="img/icons/spike.png">] : gets [<img class ="battle-log-icon" src="img/icons/energy.png">${spikeStrike}], [<img class ="battle-log-icon" src="img/icons/favorite-heart-button.png">${this.hp}] left.</span>`)
            outputToScreen(`<span class="battle-log-text-info">{<img class ="battle-log-icon" src="img/avatars/${this.icon}.png">}[${this.name}]:[${this.hp}<img class ="battle-log-icon" src="img/icons/favorite-heart-button.png">] left.</span>`)
        }

    }
    this.applyBuff = function(opponent) {
        switch(this.buff) {
            case 'fire':
                opponent.debuffList.push(
                    {
                        debuffName:'fire',
                        duration:2
                    }
                )
                outputToScreen(`<span class="battle-log-text-buff">{<img class ="battle-log-icon" src="img/avatars/${this.icon}.png">}[${this.name}] uses [<img class ="battle-log-icon" src="img/icons/${this.buff}.png">] on {<img class ="battle-log-icon" src="img/avatars/${opponent.icon}.png">}[${opponent.name}].`)
                break;
            case 'cold':
                opponent.debuffList.push(
                    {
                        debuffName:'cold',
                        duration:2
                    }
                )
                outputToScreen(`<span class="battle-log-text-buff">{<img class ="battle-log-icon" src="img/avatars/${this.icon}.png">}[${this.name}] uses [<img class ="battle-log-icon" src="img/icons/${this.buff}.png">] on {<img class ="battle-log-icon" src="img/avatars/${opponent.icon}.png">}[${opponent.name}].`)
                break;
            case 'sleep':
                opponent.debuffList.push(
                    {
                        debuffName:'sleep',
                        duration:1
                    }
                )
                outputToScreen(`<span class="battle-log-text-buff">{<img class ="battle-log-icon" src="img/avatars/${this.icon}.png">}[${this.name}] uses [<img class ="battle-log-icon" src="img/icons/${this.buff}.png">] on {<img class ="battle-log-icon" src="img/avatars/${opponent.icon}.png">}[${opponent.name}].`)
                break;                
        }
    }
    this.applySelfDebuf = function() { //retrives own debufs and applies 
        for(item in this.debuffList) {
            if(this.debuffList[item].debuffName === 'cold' && this.debuffList[item].duration > 0){
                this.attack /= 2;
                this.resist /= 2;
                this.debuffList[item].duration--;
                outputToScreen(`<span class="battle-log-text-buff">{<img class ="battle-log-icon" src="img/avatars/${this.icon}.png">}[${this.name}] suffers from [<img class ="battle-log-icon" src="img/icons/cold.png">] : [<img class ="battle-log-icon" src="img/icons/sword.png">${this.attack}], [<img class ="battle-log-icon" src="img/icons/def.png">${this.resist}]</span>`)
            }
            if(this.debuffList[item].debuffName === 'fire' && this.debuffList[item].duration > 0){
                this.hp -= 10;
                this.debuffList[item].duration--;
                outputToScreen(`<span class="battle-log-text-buff">{<img class ="battle-log-icon" src="img/avatars/${this.icon}.png">}[${this.name}] suffers from [<img class ="battle-log-icon" src="img/icons/fire.png">] : gets [<img class ="battle-log-icon" src="img/icons/energy.png">10], [<img class ="battle-log-icon" src="img/icons/favorite-heart-button.png">${this.hp}] left.</span>`)
            }
            if(this.debuffList[item].debuffName === 'sleep' && this.debuffList[item].duration > 0){
                this.sleepy = true;
                this.debuffList[item].duration--;
                outputToScreen(`<span class="battle-log-text-buff">{<img class ="battle-log-icon" src="img/avatars/${this.icon}.png">}[${this.name}] suffers from [<img class ="battle-log-icon" src="img/icons/sleep.png">] : will not attack this turn.</span>`)
            }
        }
        while(this.debuffList.some(e => e.duration == 0)){
            for(i in this.debuffList) {
                if(this.debuffList[i].duration == 0)
                    this.debuffList.splice(i,1)
            }
        }
        this.sleepy = this.debuffList.some(e => e.debuffName === 'sleepy') ? true : false;
        this.attack = this.debuffList.some(e => e.debuffName === 'cold') ? this.attack : this.attack = this.initAttack;
        this.resist = this.debuffList.some(e => e.debuffName === 'cold') ? this.resist : this.resist = this.initResist;
    }
    this.regenerate = function() {
        if(this.maxHp > this.hp) {
            if(this.maxHp - this.hp < this.hpRegen)
                this.hp = this.maxHp;
            else
                this.hp += this.hpRegen;
        }   
        outputToScreen(`<span class="battle-log-text-heal">{<img class ="battle-log-icon" src="img/avatars/${this.icon}.png">}[${this.name}]: regenerates [${this.hpRegen}<img class ="battle-log-icon" src="img/icons/favorite-heart-button.png">], [${this.hp}<img class ="battle-log-icon" src="img/icons/favorite-heart-button.png">] left.</span>`)
    }
    this.toString = function() {
        return `<span class="battle-log-text-info">{<img class ="battle-log-icon" src="img/avatars/${this.icon}.png">}[${this.name}] : [${this.hp}<img class ="battle-log-icon" src="img/icons/favorite-heart-button.png">],[<img class ="battle-log-icon" src="img/icons/sword.png">${this.attack}],[<img class ="battle-log-icon" src="img/icons/def.png">${this.resist}],[<img class ="battle-log-icon" src="img/icons/heal.png">${this.hpRegen}],[<img class ="battle-log-icon" src="img/icons/${this.buff}.png">]</span>`
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
        this.repeater = setInterval(function(){
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