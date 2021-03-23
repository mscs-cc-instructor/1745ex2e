
//chartIt();
//getData();



//function for graphing initial chart for global temp data

function newRow(cello1, cello2) {
    var table = document.getElementById("myTable").getElementsByTagName('tbody')[0];
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerText = cello1;
    cell2.innerText = cello2;
}

//get data for crickets
async function getCricketData() {
    const cricketData = [];
    const response = await fetch('data/crickets.csv');
    const data = await response.text();
    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const columns = row.split(",");
        const cricketChirps = parseFloat(columns[0]);
        const temp = parseFloat(columns[1]);
        cricketData.push({x : temp, y: cricketChirps, });
        newRow(cricketChirps, parseFloat(temp) + " F°");
    });
    return cricketData;

}

async function chartCricket() {
    const cricketData = await getCricketData();

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Cricket Chirps per Second vs Temperature in F°',
                data: cricketData,
                fill: false,
                backgroundColor: 'rgba(102, 102, 0, 0.2)'
                ,
                borderColor: 'rgba(102, 102, 0, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }],
                xAxes: [{
                    ticks: {
                        callback: function (value, index, values) {
                            return value + '°';
                        }
                    }
                }]
            }
        }
    })
};

