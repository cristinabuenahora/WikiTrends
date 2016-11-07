module.exports = function(app) {

	// application -------------------------------------------------------------
	app.get('/', function(req, res) {

		var lineReader = require('readline').createInterface({
			input: require('fs').createReadStream('../test.txt')
		});

		var wikiPages = new Object();
		lineReader.on('line', function (line) {
			wikiPages.push({name: line});
			console.log('Line from file:', line);
		});

		res.render('../views/index.ejs', {
			wikiPages: wikiPages
		});

	});

	app.get('/about', function(req, res) {
		res.sendfile('../views/about.ejs');
	});

};
