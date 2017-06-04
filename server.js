const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

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


// app.use(forceSSL());
app.use(refresh());

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// app.use('/dist/bower_components',  express.static(path.join(__dirname, 'dist/bower_components')));
app.use("/dist/assets/css", express.static(path.join(__dirname, "dist/assets/css")));
app.use("/dist/assets/css/museo", express.static(path.join(__dirname, "dist/assets/css/museo")));
app.use("/dist/assets/js", express.static(path.join(__dirname, "dist/assets/js")));
app.use("/", express.static(path.join(__dirname, "dist")));


// app.get('/*', function(req, res) {
// 	console.log("return dist");
// 	// res.sendFile(path.join(__dirname, 'dist'));
// 	res.sendFile('index.html', {root: path.join(__dirname, 'dist')});
// });

var listener = app.listen(process.env.PORT || 8080, function () {

	console.log("listening on port", listener.address().port);
});