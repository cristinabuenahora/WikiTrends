$(document).ready(function () {

  var typeId = window.location.href.split('?')[1];
  var type = typeId.split('_')[0];
  var id = typeId.split('_')[1];

  if (type === 'now') {
    $.get( '/getNowData', function(data) {
        var pageData = data.data;

        chart(pageData, type, id);
    });

  } else if (type === 'week') {
    $.get( '/getWeekData', function(data) {
        var pageData = data.data;

        chart(pageData, type, id);
    });
  } else if (type === 'month') {
    $.get( '/getMonthData', function(data) {
        var pageData = data.data;

        chart(pageData, type, id);
    });
  }
});


var chart = function (pageData, type, id) {
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      // create data chart
      var data = new google.visualization.DataTable();
      // add columns
      data.addColumn('string', 'Pageviews');

          // add pagename and descriptions
          var pagename = pageData[id].split('\t')[0];
          document.getElementById('pagename').href += "https://en.wikipedia.org/wiki/" + pagename;
          pagename = pagename.split('_').join(' ');
          document.getElementById('pagename').innerHTML += pagename;
          var desc = pageData[id].split('\t')[2];
          document.getElementById('description').innerHTML += desc;

          data.addColumn('number', pagename);
          var dates = pageData[0].split(' ');
          var pageCounts = pageData[id].split('\t')[1].split(' ');

          rows = [];
          for (var i = 0; i < pageCounts.length; i++) {
              var row = [];
              row.push(dates[i]);
              row.push(parseInt(pageCounts[i]));
              rows.push(row);
          }
          data.addRows(rows);

          var options = {
              legend: {
                  position: 'none'
              },
              tooltip: {isHtml: true},
              backgroundColor: {
                  fill: '#292f36',
                  opacity: 100
               },
              colors: ['#4ecdc4']
          };

          var chart = new google.charts.Line(document.getElementById('chart_div'));
          chart.draw(data, options);


          if (type === 'now') {
            getArticles();
          } else {
            document.getElementById('newscard').remove();
            document.getElementById('articles').remove();
          }
    }
  }


var getArticles = function () {
  var pagename = $('#pagename').text();
  var url = "https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=" + pagename + "&count=30&mkt=en-us&safeSearch=Moderate";

  $.ajax({
  	type: 'GET',
  	url: url,
    host: "api.cognitive.microsoft.com",
    headers: {"Ocp-Apim-Subscription-Key": "a3a6b62b91864305997790635e06cbcf"},
    success: function (data) {
      var articles = $('#articles');
      var innerHTML = articles.html();
      //console.log(data.value);
      for (var i = 0; i < data.value.length; i++) {
        var source = data.value[i].provider[0].name;
        //console.log(source);
        //if (newsSources.includes(source.toLowerCase())) {
          var name = data.value[i].name;
          var url = data.value[i].url;
          var desc = data.value[i].description;
          var image = data.value[i].image;
          var articleDiv = "<div class=\"articlecard\">";
          if (image) {
             var imageUrl = image.thumbnail.contentUrl;
             imageDiv = "<img class=\"articleimg\" src="+ imageUrl + ">";
             articleDiv += imageDiv;
          }
          var articleStr = "<div class=\"text\"><div class=\"text\" style=\"text-transform: uppercase\">" + source + "</div><br>" + "<div class=\"text\" style=\"font-size: 22px\">" + name + "</div></div>";
          articleDiv += "<a class=\"innercard\" href=" + url + " target=\"_blank\">" + articleStr + "</a></div>";
          articleDiv += "</div>"
          innerHTML += articleDiv + "<div class=\"line\"/>";
      }
      articles.html(innerHTML);
  	}
  });
};
