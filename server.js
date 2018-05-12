const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const config = require("./config.js");

var refreshPages = [
"home",
"contact"
]

// // If an incoming request uses
// // a protocol other than HTTPS,
// // redirect that request to the
// // same url but with HTTPS
const forceSSL = function() {
	return function (req, res, next) {
		if (req.headers['x-forwarded-proto'] !== 'https') {
			return res.redirect(['https://', req.get('Host'), req.url].join(''));
		}
		next();
	}
}

var refresh = function () {

	return function (req, res, next) {

		console.log(req.url);

		var urlArray = req.url.split("/");

		for (var i in refreshPages) {
			if (urlArray[1] == refreshPages[i]) {
				return res.redirect(['http://', req.get('Host')].join(''));
			}
		}

		next();

	}
}



var PORTS = {
	heroku:8080,
	http:80,
	livereload:config.livereloadPort,
	misc1:3300,
	misc2:4300,
	misc3:4310
}


app.use(refresh());
if  (process.env.NODE_ENV == "production") app.use(forceSSL());
else {console.log("environment development");}


app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


app.use(require('connect-livereload')({
	port: PORTS.livereload
}));


app.use("/", express.static(path.join(__dirname, "dist")));


// app.get('/*', function(req, res) {
// 	console.log("return dist");
// 	// res.sendFile(path.join(__dirname, 'dist'));
// 	res.sendFile('index.html', {root: path.join(__dirname, 'dist')});
// });


var env = process.env.NODE_ENV;
var port;

console.log("environment", env);

if (process.env.PORT) {
	port = process.env.PORT;
}
else if (env == "production") {
	port = PORTS.heroku;
}
else if (env == "development") {
	port = PORTS.misc2;
}
else {
	port = PORTS.misc1;
}


var listener = app.listen(port, function () {

	console.log("listening on port", listener.address().port);
});

