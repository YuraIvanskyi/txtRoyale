window.onload = function (){
    this.ChampionsChartContext = document.getElementById("ChampionsChart").getContext('2d');
    this.ChampionsChart = createChart(ChampionsChartContext);
    this.figthers = [];
    $("select").imagepicker();
}
function createChart(canvasObj) {
    return new Chart(canvasObj, {
        type: 'radar',
        data: {
            labels: ["Attack", "HP", "Defence", "Regeneration"],
            datasets: []
        },
        options: {
            scale: {
                ticks: {
                    beginAtZero: true
                }
            },
            title: {
                display: true,
                text: 'B a t t l e f i e l d',
                fontSize:16,
                fontFamily:"'Press Start 2P', cursive"
            },
            legend:{
                position:'bottom'
            }
        }
    });
}
function addFighter() {
    var retrivedStats = getChampionStats();
    var championLoadout = {
        name:document.getElementById("NameField").value,
        attack:retrivedStats[0],
        hp:retrivedStats[1],
        resist:retrivedStats[2],
        regen:retrivedStats[3],
        icon:retrivedStats[4],
        buff:retrivedStats[5]
    }
    var newColor = generateRandomColor();
    var championDataset = {
        label: championLoadout.name,
        borderColor: newColor.color,
        backgroundColor: newColor.alpha,
        pointBorderColor: newColor.color,
        data: retrivedStats.slice(0,retrivedStats.length-2),
    };
    figthers.push(new Champion(
        championLoadout.name,
        championLoadout.attack,
        championLoadout.hp,
        championLoadout.resist,
        championLoadout.icon,
        championLoadout.regen,
        championLoadout.buff))
    ChampionsChart.data.datasets.push(championDataset);
    ChampionsChart.update();
}
function getChampionStats() {
    var values = [
        document.getElementById('AttackField').value,
        document.getElementById('HPField').value,
        document.getElementById('ResistField').value,
        document.getElementById('RegenerationField').value,
        document.getElementById('imgPicker').value,
        document.getElementById('buffPicker').value
    ];
    return values;
}
function generateRandomColor () {
    var color = `${parseInt(Math.random()*255)}, ${parseInt(Math.random()*255)}, ${parseInt(Math.random()*255)}`
    return {
        alpha:`rgba(${color}, 0.2)`,
        color:`rgba(${color}, 1)`
    }
}
document.getElementById('AttackField').addEventListener("input", updateAttackFieldInput, false);
document.getElementById('HPField').addEventListener("input", updateHPFieldInput, false);
document.getElementById('ResistField').addEventListener("input", updateResistFieldInput, false);
document.getElementById('RegenerationField').addEventListener("input", updateRegenFieldInput, false);

function updateAttackFieldInput(val) {
    document.getElementById('AttackFieldInput').innerHTML = `Attack : [${document.getElementById('AttackField').value}]`
}
function updateHPFieldInput(val) {
    document.getElementById('HPFieldInput').innerHTML = `HP : [${document.getElementById('HPField').value}]` 
}
function updateResistFieldInput(val) {
    document.getElementById('ResistFieldInput').innerHTML = `Defence : [${document.getElementById('ResistField').value}]`
}
function updateRegenFieldInput(val) {
    document.getElementById('RegenFieldInput').innerHTML = `Regen : [${document.getElementById('RegenerationField').value}]`
}
function ChampionsFight(){
    if(figthers.length <= 1)
        alert('Are you little mentaly retarded? Send at least 2 victims to battle before starting it!')
    else 
        fight(figthers);
}
function stopFight(){
    clearInterval(this.repeater);
}
function clearBattlefield() {
    document.getElementById('siteAds').innerHTML = 'Battle Log:'
    ChampionsChart.data.datasets = [];
    ChampionsChart.update();
    figthers = [];
}