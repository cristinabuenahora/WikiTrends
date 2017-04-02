$(document).ready(function () {
  var type = window.location.href.split('/')[3];
  var category = window.location.href.split('?')[1];
  if (type == undefined || type == 'now') {
    if (category === undefined) {
      document.getElementById('all').style.backgroundColor = "#4ECDC4";
    } else if (category === 'politics') {
      document.getElementById('politics').style.backgroundColor = "#4ECDC4";
    } else if (category === 'history') {
      document.getElementById('history').style.backgroundColor = "#4ECDC4";
    } else if (category === 'techScience') {
      document.getElementById('techScience').style.backgroundColor = "#4ECDC4";
    } else if (category === 'entertainment') {
      document.getElementById('entertainment').style.backgroundColor = "#4ECDC4";
    } else if (category === 'sports') {
      document.getElementById('sports').style.backgroundColor = "#4ECDC4";
    }
  } else if (type == 'week') {
    if (category === undefined) {
      document.getElementById('all').style.backgroundColor = "#FF6B6B";
    } else if (category === 'politics') {
      document.getElementById('politics').style.backgroundColor = "#FF6B6B";
    } else if (category === 'history') {
      document.getElementById('history').style.backgroundColor = "#FF6B6B";
    } else if (category === 'techScience') {
      document.getElementById('techScience').style.backgroundColor = "#FF6B6B";
    } else if (category === 'entertainment') {
      document.getElementById('entertainment').style.backgroundColor = "#FF6B6B";
    } else if (category === 'sports') {
      document.getElementById('sports').style.backgroundColor = "#FF6B6B";
    }
  } else if (type == 'month') {
    if (category === undefined) {
      document.getElementById('all').style.backgroundColor = "#FFDB58";
    } else if (category === 'politics') {
      document.getElementById('politics').style.backgroundColor = "#FFDB58";
    } else if (category === 'history') {
      document.getElementById('history').style.backgroundColor = "#FFDB58";
    } else if (category === 'techScience') {
      document.getElementById('techScience').style.backgroundColor = "#FFDB58";
    } else if (category === 'entertainment') {
      document.getElementById('entertainment').style.backgroundColor = "#FFDB58";
    } else if (category === 'sports') {
      document.getElementById('sports').style.backgroundColor = "#FFDB58";
    }
  }

  getImages(category);
});


var getImages = function (category) {

  var type = window.location.href.split("/")[3];
  if (type == undefined) type = 'now';

  var categoryContains = false;

  for (var i = 1; i < numberOfPages - 1; i++) {

    var pageCategory = $("#category" + i).html().toLowerCase();

    if (category == undefined || pageCategory == category) {

      categoryContains = true;
      var pagename = $("#title" + i).html();
      var url = 'https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=' + pagename + '&callback=?';

      if (category != undefined) {
        $("#category" + i)[0].style.visibility = "hidden";
        $("#category" + i)[0].style.height = "0";
        $("#category" + i)[0].style.margin = "0px";
      }

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
                    if (type == undefined || type == 'now') {
                      newHTML = "<div class=\"imgwrap\"><div class=\"imgtext\">" + i + "</div><img class=\"cardimg\" src=\"images/arrow.png\"></div>" + "<div class=\"innercard\">" + $("#wikicard" + i).html() + "<a href=\"/wikipage?" + type + "_" + i + "\" class=\"seemore\" style=\"text-decoration: underline\">See more</a>";
                    } else if (type == 'week') {
                      newHTML = "<div class=\"imgwrap\"><div class=\"imgtext\">" + i + "</div><img class=\"cardimg\" src=\"images/weekarrow.png\"></div>" + "<div class=\"innercard\">" + $("#wikicard" + i).html() + "<a href=\"/wikipage?" + type + "_" + i + "\" class=\"seemore\" style=\"text-decoration: underline\">See more</a>";
                    } else if (type == 'month') {
                      newHTML = "<div class=\"imgwrap\"><div class=\"imgtext\">" + i + "</div><img class=\"cardimg\" src=\"images/montharrow.png\"></div>" + "<div class=\"innercard\">" + $("#wikicard" + i).html() + "<a href=\"/wikipage?" + type + "_" + i + "\" class=\"seemore\" style=\"text-decoration: underline\">See more</a>";
                    }
                  }
                  $("#wikicard" + i).html(newHTML);
                }
              }
          },
          error: function (errorMessage) {
          }
      });
    } else {
      $("#wikicard" + i)[0].style.visibility = "hidden";
      $("#wikicard" + i)[0].style.height = "0";
      $("#wikicard" + i)[0].style.margin = "0px";
    }
  }

  if (!categoryContains) {
    if (category == "techScience") category = "Tech and Science";
    var div = "<div class=\"emptyCategory\">Nothing trending in " + category + "</div>";
    document.getElementById("trending").innerHTML = div;
  }
};


var getArticles = function () {
  for (var i = 1; i < numberOfPages - 1; i++) {
    var pagename = $("#title" + i).html();
    var url = "https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=" + pagename + "&count=3&offset=0&mkt=en-us&safeSearch=Moderate&freshness=day";

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
