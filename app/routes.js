module.exports = function(app) {

	var $ = require('jquery');

	var lineReader = require('readline').createInterface({
		input: require('fs').createReadStream('test.txt')
	});

	lineReader.on('line', function (line) {
		console.log('Line from file:', line);
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./views/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

};
