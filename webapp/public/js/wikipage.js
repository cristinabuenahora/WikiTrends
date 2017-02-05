//console.log('in chart.js');

$.get( "/getData", function(data) {
    var pageData = data.pageData;
    //var month = data.month;
    var id = parseInt(window.location.href.split('?')[1]);

    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        // create data chart
        var data = new google.visualization.DataTable();

        // add columns
        data.addColumn('string', 'Pageviews');

        // add pagename
        var pagename = pageData[id].split('\t')[0];
        pagename = pagename.split('_').join(' ');
        document.getElementById('pagename').innerHTML += pagename;

        data.addColumn('number', pagename);
        var pageCounts = pageData[id].split('\t')[1].split(' ');
        var description =  pageData[id].split('\t')[2];

        rows = [];
        for (var i = 0; i < pageCounts.length; i++) {
            var row = [];
            row.push('Dec ' + (i + 1));
            row.push(parseInt(pageCounts[i]));
            rows.push(row);
        }
        data.addRows(rows);

        var options = {
            legend: {
                position: 'none'
            },
            colors: ['#1d224c']
        };

        var chart = new google.charts.Line(document.getElementById('chart_div'));
        chart.draw(data, options);

        // add description
        document.getElementById('description').innerHTML += description;

        getArticles();
    }
});

var getArticles = function () {
  var pagename = $('#pagename').text();
  console.log(pagename);

  var url = "https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=" + pagename + "&count=8&offset=0&mkt=en-us&safeSearch=Moderate";
  console.log("url: " + url);

  $.ajax({
  	type: 'GET',
  	url: url,
    host: "api.cognitive.microsoft.com",
    headers: {"Ocp-Apim-Subscription-Key": "a3a6b62b91864305997790635e06cbcf"},
    success: function (data) {
      var articles = $('#articles');
      var innerHTML = "";
      console.log(data.value);
      for (var i = 0; i < data.value.length; i++) {
        var source = data.value[i].provider[0].name;
        var name = data.value[i].name;
        var url = data.value[i].url;
        // var image = data.value[i].image;
        // var imageDiv = "";
        // if (image) {
        //   var imageUrl = image.thumbnail.contentUrl;
        //   imageDiv = "<img class=\"articleImg\" source="+ imageUrl + "></img>";
        // }
        innerHTML += ("<div class=\"text\"> " + source + ":" + "</div> <a class=\"text\" href=" + url + "> " + name + "</a>");
      }
      articles.html(innerHTML);
  	}
  });
};
