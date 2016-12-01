//console.log('in chart.js'); 

$.get( "/getData", function(data) {
    var pageData = data.pageData;
    var id = parseInt(window.location.href.split('?')[1]); 

    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        // create data chart 
        var data = new google.visualization.DataTable();

        // add columns
        data.addColumn('string', 'Pageviews');

        // add pageName
        var pageName = pageData[id].split('\t')[0];
        pageName = pageName.split('_').join(' ');
        document.getElementById('pageName').innerHTML += pageName; 


        data.addColumn('number', pageName); 
        var pageCounts = pageData[id].split('\t')[1].split(' ');
        var description =  pageData[id].split('\t')[2];

        rows = []; 
        for (var i = 0; i < pageCounts.length - 1; i++) {
            var row = []; 
            row.push('Nov ' + (i + 1));
            row.push(parseInt(pageCounts[i]));
            rows.push(row); 
        }
        data.addRows(rows); 
        
        /*
        var pageCounts = []; 
        for (var i = 0; i < pageData.length - 1; i++) {
            var pageName = pageData[i].split('\t')[0];
            pageName = pageName.split('_').join(' ');
            data.addColumn('number', pageName); 
            pageCounts.push(pageData[i].split('\t')[1].split(' ')); 
        }

        // add rows 
        rows = []; 
        for (var i = 0; i < 4; i++) {
            row = [i]; 
            for (var j = 0; j < pageData.length - 1; j++) {
                row.push(parseInt(pageCounts[j][i])); 
            }
            rows.push(row); 
        }
        console.log(rows); 
        data.addRows(rows); */ 

        var options = {
            /*chart: {
                title: pageName,
                titleTextStyle: {
                    color: '#1d224c', 
                    fontSize: 30,
                    bold: true 
                }
            },*/ 
            legend: { 
                position: 'none'
            }, 
            colors: ['#1d224c']
        };

        var chart = new google.charts.Line(document.getElementById('chart_div'));
        chart.draw(data, options); 

        // add description
        document.getElementById('description').innerHTML += description; 
    }
});