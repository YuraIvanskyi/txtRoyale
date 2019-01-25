window.onload = function (){
    this.ChampionsChartContext = document.getElementById("ChampionsChart").getContext('2d');
    //this.ctx2 = document.getElementById("myChart2").getContext('2d');
    //this.ctx3 = document.getElementById("myChart3").getContext('2d');
    //this.ctx4 = document.getElementById("myChart4").getContext('2d');
    this.ChampionsChart = createChart(ChampionsChartContext);
    //this.myChart2 = createChart(ctx2);
    //this.myChart3 = createChart(ctx3);
    //this.myChart4 = createChart(ctx4);
}

function generateValues() {
    var values = [parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100)];
    return values;
}
function createChart(canvasObj) {
    return new Chart(canvasObj, {
        type: 'radar',
        data: {
            labels: ["Attack", "HP", "Defence", "Resist", "Regeneration"],
            datasets: []
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
            title: {
                display: true,
                text: 'Battlefield'
            },
        }
    });
}
function addFighter() {
    var newColor = generateRandomColor();
    var championDataset = {
        label: document.getElementsByName("NameField").innerText,
        borderColor: newColor.color,
        backgroundColor: newColor.alpha,
        pointBorderColor: newColor.color,
        data: generateValues(),
    };

    ChampionsChart.data.datasets.push(championDataset);
    ChampionsChart.update();
}
function generateRandomColor () {
    var color = `${parseInt(Math.random()*255)}, ${parseInt(Math.random()*255)}, ${parseInt(Math.random()*255)}`
    return {
        alpha:`rgba(${color}, 0.2)`,
        color:`rgba(${color}, 1)`
    }
}
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.data.datasets[0].backgroundColor.push(generateRandomColor());
    chart.data.datasets[0].borderColor.push('rgba(0, 0, 0, 1)');
    chart.update();
}
function updateAttackFieldInput(val) {
    var current = document.getElementById('AttackFieldInput').innerHTML
    document.getElementById('AttackFieldInput').innerHTML = current.replace(/([\[(])(.+?)([\])])/g, `[${val}]`); 
}
function updateHPFieldInput(val) {
    var current = document.getElementById('HPFieldInput').innerHTML
    document.getElementById('HPFieldInput').innerHTML = current.replace(/([\[(])(.+?)([\])])/g, `[${val}]`); 
}
function updateResistFieldInput(val) {
    var current = document.getElementById('ResistFieldInput').innerHTML
    document.getElementById('ResistFieldInput').innerHTML = current.replace(/([\[(])(.+?)([\])])/g, `[${val}]`); 
}
function updateRegenFieldInput(val) {
    var current = document.getElementById('RegenFieldInput').innerHTML
    document.getElementById('RegenFieldInput').innerHTML = current.replace(/([\[(])(.+?)([\])])/g, `[${val}]`); 
}
function updateDefenceFieldInput(val) {
    var current = document.getElementById('DefenceFieldInput').innerHTML
    document.getElementById('DefenceFieldInput').innerHTML = current.replace(/([\[(])(.+?)([\])])/g, `[${val}]`); 
}