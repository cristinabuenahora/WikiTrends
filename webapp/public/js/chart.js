console.log('in chart.js'); 

$.get( "/getData", function(data) {
    pageData = data.pageData;
    console.log(pageData); 

    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        // create data chart 
        var data = new google.visualization.DataTable();

        var id = parseInt(window.location.href.split('?')[1]); 
        console.log(id); 

        // add columns
        data.addColumn('number', 'Pageviews');
        var pageName = pageData[id].split('\t')[0];
        pageName = pageName.split('_').join(' ');
        data.addColumn('number', pageName); 
        var pageCounts = pageData[id].split('\t')[1].split(' '); 

        rows = []; 
        for (var i = 0; i < pageCounts.length; i++) {
            var row = []; 
            row.push(i);
            row.push(parseInt(pageCounts[i]));
            rows.push(row); 
        }
        console.log(rows); 
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
            chart: {
                title: pageName
            },
            height: 400
        };

        var chart = new google.charts.Line(document.getElementById('chart_div'));
        chart.draw(data, options); 

    }
});