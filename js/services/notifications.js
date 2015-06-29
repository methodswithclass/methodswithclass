app.factory("notifications", function () {

	var callback = {};

	var registerChange = function (name, _callback) {

		console.log("registered " + name);

		callback[name] = _callback;

	}

	var change = function (name) {

		console.log("changed " + name);

		if (callback.length > 0) callback[name]();
	}

	return {
		registerChange:registerChange,
		change:change
	}

});