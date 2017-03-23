$(document).ready(function () {
  getImages();
});


var getImages = function () {
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
              if (img.includes('Ambox_important') || img.includes('Ambox_current') || img.includes('Wiki_letter_w.svg') || img.includes('Question_book-new.svg')) {
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

            desc = blurb[0].innerHTML.split('<p>');
            if (desc.length == 1) {
              desc = blurb[0].innerHTML.split('<p');
              descArr = desc[1].split('>');
              desc[1] = '';
              for (var i = 2; i < descArr.length; i++) {
                desc[1] += descArr[i] + '>';
              }
            }
            desc = desc[1].split('</p>')[0];

            for (var i = 1; i < numberOfPages - 1; i++) {
              if ($("#title" + i).html() === (title)) {
                var inner = $("#wikipage" + i).html() + "<br><div class=\"text\">" + desc + "</div> </div>";
                $("#wikipage" + i).html(inner);
                var newHTML = "";
                if (img != undefined) {
                  newHTML = "<div class=\"imgwrap\"><div class=\"imgtext\">" + i + "</div><img src=\"" + img + "\" class=\"cardimg\"></div>" + "<div class=\"innercard\">" + $("#wikicard" + i).html() + "<br><a href=\"/wikipage?" + i + "\" class=\"seemore\" style=\"text-align: right\">See more...</a>";
                } else {
                  newHTML = "<div class=\"imgwrap\"><div class=\"imgtext\">" + i + "</div></div>" + "<div class=\"innercard\">" + $("#wikicard" + i).html() + "<br><a href=\"/wikipage?" + i + "\" class=\"seemore\" style=\"text-align: right\">See more...</a>";
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
