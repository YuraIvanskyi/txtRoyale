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

function genreateValues() {
    return [parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100)]
}
function createChart(canvasObj) {
    return new Chart(canvasObj, {
        type: 'radar',
        data: {
            labels: ["Attack", "HP", "Resist", "Regeneration"],
            datasets: [{
                label: '# of Votes',
                data: genreateValues(),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)'
                ],
                borderColor: [
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}
function addFighter() {
    ChampionsChart.options.title.text = 'Baka-charuto!';
    ChampionsChart.options.display = true;
    addData(ChampionsChart,'test',Math.random()*100);
    ChampionsChart.update()
}
function generateRandomColor () {
    return `rgba(${parseInt(Math.random()*255)}, ${parseInt(Math.random()*255)}, ${parseInt(Math.random()*255)}, 0.7)`
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