// set up ======================================================================

var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// create app
var app = express();
// set up port
var port = process.env.PORT || 8000;

var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ===============================================================

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(session({secret: "wikipages"}));
app.set('view engine', 'ejs');

// routes ======================================================================
require('./routes/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
