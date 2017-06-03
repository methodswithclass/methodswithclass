const express = require("express");
const path = require("path");

const app = express();



// // If an incoming request uses
// // a protocol other than HTTPS,
// // redirect that request to the
// // same url but with HTTPS
const forceSSL = function() {
	return function (req, res, next) {
		if (req.headers['x-forwarded-proto'] !== 'https') {
			return res.redirect(
			                    ['https://', req.get('Host'), req.url].join('')
			                    );
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
				return res.redirect(['https://', req.get('Host')].join(''));
			}
		}

		next();

	}
}

// Instruct the app
// to use the forceSSL
// middleware
// app.use(forceSSL());
// app.use(refresh());
app.use(express.static(__dirname + "/index.html"));

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/index.html'));
// });

app.listen(process.env.PORT || 8080, function () {

	console.log("listening on port 3000");
});