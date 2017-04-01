$(document).ready(function () {
  var category = window.location.href.split('?')[1];
  console.log(category);
  if (category === undefined) {
    document.getElementById('all').style.textDecoration = "underline";
  } else if (category === 'politics') {
    document.getElementById('politics').style.textDecoration = "underline";
  } else if (category === 'history') {
    document.getElementById('history').style.textDecoration = "underline";
  } else if (category === 'techScience') {
    document.getElementById('techScience').style.textDecoration = "underline";
  } else if (category === 'entertainment') {
    document.getElementById('entertainment').style.textDecoration = "underline";
  } else if (category === 'sports') {
    document.getElementById('sports').style.textDecoration = "underline";
  }

  getImages(category);
});


var getImages = function (category) {

  var type = window.location.href.split("/")[3];
  if (type == undefined) type = 'now';

  for (var i = 1; i < numberOfPages - 1; i++) {
    var pagename = $("#title" + i).html();
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

            img = blurb[0].innerHTML.split('src=\"');
            if (img.length != 1) {
              img = "https:" + img[1].split(' ')[0];
              if (img.includes('23px') || img.includes('Ambox_important') || img.includes('Ambox_current') || img.includes('Wiki_letter_w.svg') || img.includes('Question_book-new.svg') || img.includes('Edit-clear') || img.includes('Commons-logo.svg')) {
                img = undefined;
                imgArr = blurb[0].innerHTML.split('src="');
                for (var i = 0; i < imgArr.length; i++) {
                  if (imgArr[i].includes('width="220"')) {
                    img = imgArr[i].split(' ')[0];
                    break;
                  }
                }
              }
            } else {
              img = undefined;
            }

            for (var i = 1; i < numberOfPages - 1; i++) {
              if ($("#title" + i).html() === (title)) {
                var newHTML = "";
                if (img != undefined) {
                  newHTML = "<div class=\"imgwrap\"><div class=\"imgtext\">" + i + "</div><img class=\"cardimg\" src=\"" + img + "\"></div>" + "<div class=\"innercard\">" + $("#wikicard" + i).html() + "<a href=\"/wikipage?" + type + "_" + i + "\" class=\"seemore\" style=\"text-decoration: underline\">See more</a>";
                } else {
                  newHTML = "<div class=\"imgwrap\"><div class=\"imgtext\">" + i + "</div><img class=\"cardimg\" src=\"images/arrow.png\"></div>" + "<div class=\"innercard\">" + $("#wikicard" + i).html() + "<a href=\"/wikipage?" + type + "_" + i + "\" class=\"seemore\" style=\"text-decoration: underline\">See more</a>";
                }
                $("#wikicard" + i).html(newHTML);
              }
            }
        },
        error: function (errorMessage) {
        }
    });
  }
};


var getArticles = function () {
  for (var i = 1; i < numberOfPages - 1; i++) {
    var pagename = $("#title" + i).html();
    //console.log(pagename);

    var url = "https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=" + pagename + "&count=3&offset=0&mkt=en-us&safeSearch=Moderate&freshness=day";
    //console.log("url: " + url);

    $.ajax({
    	type: 'GET',
    	url: url,
      host: "api.cognitive.microsoft.com",
      headers: {"Ocp-Apim-Subscription-Key": "a3a6b62b91864305997790635e06cbcf"},
      success: function (data, i) {

        var pagename = data.readLink.split("q=")[1].split("\"")[0].split("+").join(" ");
        console.log(pagename);

        for (var i = 1; i < numberOfPages - 1; i++) {
          if ($("#title" + i).html() === (pagename)) {
            var articles = $('#articles' + i);
            var innerHTML = articles.html();
            for (var i = 0; i < data.value.length; i++) {
              var source = data.value[i].provider[0].name;
              var name = data.value[i].name;
              var url = data.value[i].url;
              var articleDiv = "<div class=\"articlecard\">";

              var articleStr = "<div class=\"text\"><div class=\"text\" style=\"font-size: 22px\">" + name + "</div></div>";
              articleDiv += "<a class=\"innercard\" href=" + url + " target=\"_blank\">" + articleStr + "</a></div>";
              articleDiv += "</div>"
              innerHTML += articleDiv + "<div class=\"line\"/>";
            }
            articles.html(innerHTML);
          }
        }
    	}
    });
  }
};


var getCategory = function () {
  for (var i = 1; i < numberOfPages - 1; i++) {
    var pagename = $("#title" + i).html();
    var url = 'https://en.wikipedia.org/w/api.php?action=query&prop=categories&titles=' + pagename;
    console.log('requesting');

    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        origin: "*",
        success: function (data, textStatus, jqXHR) {

          console.log(data);

            var title = data.parse.title;
            var markup = data.parse.text["*"];
            var blurb = $('<div></div>').html(markup);

        },
        error: function (errorMessage) {
        }
    });
  }
};
