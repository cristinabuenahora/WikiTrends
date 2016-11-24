var fs = require('fs');

module.exports = function(app) {

	// application -------------------------------------------------------------

	app.get('/', function(req, res) {
			var pageNames = fs.readFileSync('data/test.txt').toString('utf8').split('\n');
			var numPages = pageNames.length;

			res.render('index', {
					wikiPageNames: pageNames,
					numberOfPages: numPages,
			});
	});

	app.get('/about', function(req, res) {
		res.render('about.ejs');
	});

	app.get('/wikipage', function(req, res) {
		res.render('wikipage.ejs');
	});

};
