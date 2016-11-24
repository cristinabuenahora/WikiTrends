google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
	// create data chart 
	var data = new google.visualization.DataTable();

	// read in data from text file 
	$.ajax({url: 'data/test.txt', type: 'POST'}).success(
        function (data, status, headers, config) {
			console.log(data); 
			console.log(status); 
			console.log(headers); 
			console.log(config); 
		}
            /*stat_data = JSON.parse(stat_data);

            var options = {
              title: 'Average Wait Times by Day',
              legend: { position: 'bottom' },
                vAxis: {title: 'Wait time in Minutes'}
            };

            var data = google.visualization.arrayToDataTable(stat_data['average_wait_times']);

            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

            chart.draw(data, options);
        }*/ 
    );

    data.addColumn('number', 'Pageviews');
    data.addColumn('number', 'Guardians of the Galaxy');
	data.addColumn('number', 'The Avengers');
    data.addColumn('number', 'Transformers: Age of Extinction');

    data.addRows([
        [1,  37.8, 80.8, 41.8],
        [2,  30.9, 69.5, 32.4],
        [3,  25.4,   57, 25.7],
        [4,  11.7, 18.8, 10.5],
        [5,  11.9, 17.6, 10.4],
        [6,   8.8, 13.6,  7.7],
        [7,   7.6, 12.3,  9.6],
        [8,  12.3, 29.2, 10.6],
        [9,  16.9, 42.9, 14.8],
        [10, 12.8, 30.9, 11.6],
        [11,  5.3,  7.9,  4.7],
        [12,  6.6,  8.4,  5.2],
        [13,  4.8,  6.3,  3.6],
        [14,  4.2,  6.2,  3.4]
    ]);

    var options = {
    	chart: {
        	title: 'Box Office Earnings in First Two Weeks of Opening',
          	subtitle: 'in millions of dollars (USD)'
        },
        height: 400
    };

    var chart = new google.charts.Line(document.getElementById('chart_div'));

    chart.draw(data, options);

	/*
	$.ajax({url: stats_cgi, type: 'POST'}).success(
        function (stat_data, status, headers, config) {

            stat_data = JSON.parse(stat_data);

            var options = {
              title: 'Average Wait Times by Day',
              legend: { position: 'bottom' },
                vAxis: {title: 'Wait time in Minutes'}
            };

            var data = google.visualization.arrayToDataTable(stat_data['average_wait_times']);

            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

            chart.draw(data, options);
        }
    );
	*/ 

}