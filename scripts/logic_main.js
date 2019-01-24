var ctx1 = document.getElementById("myChart1").getContext('2d');
    var ctx2 = document.getElementById("myChart2").getContext('2d');
    var ctx3 = document.getElementById("myChart3").getContext('2d');
    var ctx4 = document.getElementById("myChart4").getContext('2d');
function genreateValues() {
    return [parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100)]
}
function createChart(canvasObj) {
    return new Chart(canvasObj, {
        type: 'polarArea',
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
    
    var myChart1 = createChart(ctx1);
    var myChart2 = createChart(ctx2);
    var myChart3 = createChart(ctx3);
    var myChart4 = createChart(ctx4);
    myChart4.update()
}