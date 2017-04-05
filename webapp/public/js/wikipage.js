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

          getArticles();
    }
  }


var getArticles = function () {
  var pagename = $('#pagename').text();
  var url = "https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=" + pagename + "&count=40&mkt=en-us&safeSearch=Moderate";

  var fakeSources = ["occupydemocrats.com", "celebtricity.com", "empirenews.net", "firebrandleft.com", "huzlers.com", "thelastlineofdefense.org", "linkbeef.com", "kmt11.com", "nationalreport.net", "bloomberg.ma", "cnn-trending.com", "bizstandardnews.com", "drudgereport.com.co", "usatoday.com.co", "americannews.com", "washingtonpost.com.co", "addictinginfo.com", "rightwingnews.com", "abcnews.com.co", "theonion.com", "70news.wordpress.com", "eaglerising.com", "nationalreport.net", "infowars.com", "mediamass.net", "denverguardian.com", "reach365.com", "stuppid.com", "boston-tribune", "thenewsnerd.com", "conservative-frontline"];

  $.ajax({
  	type: 'GET',
  	url: url,
    host: "api.cognitive.microsoft.com",
    headers: {"Ocp-Apim-Subscription-Key": "a3a6b62b91864305997790635e06cbcf"},
    success: function (data) {
      var articles = $('#articles');
      var innerHTML = articles.html();
      for (var i = 0; i < data.value.length; i++) {
        var url = data.value[i].url;
        var source = data.value[i].provider[0].name;

        var fakeNews = false;
        for (var j = 0; j < fakeSources.length; j++) {
          if (url.includes(fakeSources[j])) {
            console.log(fakeSources[j]);
            fakeNews = true;
          }
        }

        if (!fakeNews && !source.includes(".com") && source.split(".").length < 3) {
          var name = data.value[i].name;
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
        } else {
          console.log("removing " + source + ": " + data.value[i].name);
        }
      }
      articles.html(innerHTML);
  	}
  });
};
