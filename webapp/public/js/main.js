// $(document).ready(function () {
//   console.log(numberOfPages);
//   getImages();
// });


// var getImages = function () {
//   var index = 0;
//   for (var i = 0; i < numberOfPages - 1; i++) {
//     var pagename = $("#title" + i).html();
//     console.log(pagename);
//     var url = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=" + pagename;
//     // var url = "http://en.wikipedia.org/w/api.php?action=query&list=allimages&aiprop=url&format=xml&ailimit=10&aifrom=" + pagename;
//     //
//     // $.ajax({
//     // 	type: 'GET',
//     // 	url: url,
//     //   host: "commons.wikimedia.org",
//     //   success: function (data) {
//     //     if (data.value[0].image) {
//     //       var imageUrl = data.value[0].image.thumbnail.contentUrl;
//     //       var newHTML = "<img src=\"" + imageUrl + "\">" + $("#wikicard" + index).html();
//     //       $("#wikicard" + index).html(newHTML);
//     //       console.log($("#wikicard" + index).html());
//     //     }
//     //     index++;
//     // 	}
//     // });
//
//     // $.ajax({
//     // 	type: 'GET',
//     // 	url: url,
//     //   host: "api.cognitive.microsoft.com",
//     //   headers: {"Ocp-Apim-Subscription-Key": "a3a6b62b91864305997790635e06cbcf"},
//     //   success: function (data) {
//     //     console.log(data);
//     //     var imageUrl = data.value[0].contentUrl;
//     //     var newHTML = "<img src=\"" + imageUrl + "\" class=\"cardimg\">" + $("#wikicard" + index).html();
//     //     $("#wikicard" + index).html(newHTML);
//     //     console.log($("#wikicard" + index).html());
//     //     index++;
//     // 	}
//     // });
//   }
// };
