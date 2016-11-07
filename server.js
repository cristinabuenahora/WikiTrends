// set up ======================================================================

var express = require('express');
// create app
var app = express();
// set up port
var port = process.env.PORT || 8080; 

var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ===============================================================

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
