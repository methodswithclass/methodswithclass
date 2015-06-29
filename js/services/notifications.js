app.factory("notifications", function () {

	var callback = {};

	var registerChange = function (name, _callback) {

		callback[name] = _callback;

	}

	var change = function (name) {

		callback[name]();
	}

	return {
		registerChange:registerChange,
		change:change
	}

});