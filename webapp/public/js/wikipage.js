//console.log('in chart.js');

$.get( '/getData', function(data) {
    var pageData = undefined;
    //var month = data.month;
    var typeId = window.location.href.split('?')[1];
    var type = typeId.split('_')[0];
    var id = typeId.split('_')[1];
    if (type === 'now') {
      pageData = data.nowData;
    } else if (type === 'week') {
      pageData = data.weekData;
    } else if (type === 'month') {
      pageData = data.monthData;
    }

    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        // create data chart
        var data = new google.visualization.DataTable();

        // add columns
        data.addColumn('string', 'Pageviews');

        // add pagename
        var pagename = pageData[id].split('\t')[0];
        document.getElementById('pagename').href += "https://en.wikipedia.org/wiki/" + pagename;
        pagename = pagename.split('_').join(' ');
        document.getElementById('pagename').innerHTML += pagename;

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

        getDescription();
        if (type === 'now') {
          getArticles();
        } else {
          document.getElementById('newscard').remove();
          document.getElementById('articles').remove();
        }
    }
});

var getDescription = function () {
  var pagename = $('#pagename').text();
  console.log(pagename);
  var url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=' + pagename + '&callback=?';

  $.ajax({
      type: "GET",
      url: url,
      contentType: "application/json; charset=utf-8",
      async: false,
      dataType: "json",
      success: function (data, textStatus, jqXHR) {

          var title = data.parse.title;
          var markup = data.parse.text["*"];
          var blurb = $('<div></div>').html(markup);

          // remove links as they will not work
          blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });
          // remove any references
          blurb.find('sup').remove();
          // remove cite error
          blurb.find('.mw-ext-cite-error').remove();

          desc = blurb[0].innerHTML.split('<p>');
          if (desc.length == 1) {
            desc = blurb[0].innerHTML.split('<p align="justify">');
          }
          desc = desc[1].split('</p>')[0];

          console.log(desc);

          // add description to html
          document.getElementById('description').innerHTML += desc;
      },
      error: function (errorMessage) {
      }
  });
}

var getArticles = function () {

  // const client = webhoseio.config({token: '3f07ddf5-10b1-40b8-95d5-78492557f2c8'});
  // client.query('filterWebData', {q: 'github'})
  //   .then(output => {
  //     console.log(output['posts'][0]['text']); // Print the text of the first post
  //     console.log(output['posts'][0]['published']); // Print the text of the first post publication date
  // });
  //
  // // Get the next batch of posts
  // client.getNext()
  //   .then(output => {
  //     console.log(output['posts'][0]['thread']['site']); // Print the site of the first post
  //   });
  //
  // console.log("------------------------");

  var newsSources = "npr pbs bbc cnn nbc abc fox hannity limbaugh glenn beck";

  var pagename = $('#pagename').text();
  console.log(pagename);

  var url = "https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=" + pagename + "&count=30&offset=0&mkt=en-us&safeSearch=Moderate&freshness=day";
  console.log("url: " + url);

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
          var image = data.value[i].image;
          var articleDiv = "<div class=\"articlecard\">";
          if (image) {
             var imageUrl = image.thumbnail.contentUrl;
             imageDiv = "<img class=\"articleimg\" src="+ imageUrl + ">";
             articleDiv += imageDiv;
          }
          var articleStr = "<div class=\"text\"><i>" + source + "</i></div>" + "<div class=\"text\">" + name + "</div>";
          articleDiv += "<a class=\"innercard\" href=" + url + " target=\"_blank\">" + articleStr + "</a></div>";
          articleDiv += "</div>"
          innerHTML += articleDiv + "";
        //}
      }
      articles.html(innerHTML);
  	}
  });
};
