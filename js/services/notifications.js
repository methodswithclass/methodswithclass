app.factory("notifications", function () {

	var self = this;

	this.callback = {};

	var register = function (name, callback) {

		self.callback[name] = callback;
	}

	var call = function (name) {

		self.callback[name]();
	}

	return {
		register:register,
		call:call
	}

});