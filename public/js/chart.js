document.addEventListener('DOMContentLoaded', function () {


    var dropdown = document.querySelectorAll("select");
    var dropdown_instance = M.FormSelect.init(dropdown);


    let labels = [];
    let amounts = [];


    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            console.log("got the data!! " + this.responseText);
        }
    }

    
    $('#update_btn').click(function(event){
        console.log("updateClicked!!")
        // get the month, year and the expense catgegory
        let category =  $("[name='category']:checked").val();
        console.log(category)
        console.log("Selected category " + category)

        // get month and year
        var dropdown = document.querySelectorAll("select");
        var dropdown_instance = M.FormSelect.init(dropdown);
        let month = dropdown_instance[0].getSelectedValues()
        let year = dropdown_instance[1].getSelectedValues()
        console.log(year)
        console.log(month)

        var startdate = year + '-' + month + '-' + '01';
        var enddate = year + '-' + month + '-' + '31';

        if(year[0].length == 0 || month[0].length == 0 ){
            M.toast({html:'Please select Month and Year'})
        }
        else {
            $.get('/'+ category.toLowerCase() + '/' + year[0] + '/' + month[0] + '/sum', function(data) {
                console.log(data)
                labels = []
                amounts = []


                // Remove chart data
                removeChartData(chart)

                // Check if we have any records for the given month
                if(data.length == 0 ) {
                    console.log("We have no records available")
                    M.toast({html:'No records available for the selected time'})
                }
                else {
                    for(let i = 0; i < data.length; i++){
                        labels.push(data[i].name)
                        amounts.push(data[i].amount)
                        // Update chart
                        addDataToChart(chart, data[i].name, data[i].amount, category)
                    }
                    console.log("Received labels: " , labels)
                    console.log("Received amounts: " , amounts)
                }
                

            } )
        }
    })
    

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: [],
            datasets: [{
                label: 'Expenses',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: []
            }]
        },

        // Configuration options go here
        options: {}
    });

    
    function addDataToChart(chart, label, data, datasetLabel) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
            dataset.label = datasetLabel;
        });
        chart.update();
    }

    function removeChartData(chart) {
        chart.data.labels = []
        chart.data.datasets.forEach((dataset) => {
            dataset.data = [];
        });
        chart.update();
    }
})