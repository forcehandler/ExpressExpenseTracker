document.addEventListener('DOMContentLoaded', function () {


    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            console.log("got the data!! " + this.responseText);
        }
    }

    http.open("GET", "/expenses/lads/were", true)
    http.send()

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 15]
            }]
        },

        // Configuration options go here
        options: {}
    });
})