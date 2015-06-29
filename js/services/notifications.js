app.factory("notifications", function () {

	var self = this;

	this.callback = {};

	var registerChange = function (name, callback) {

		console.log("registered " + name);

		self.callback[name] = callback;

	}

	var change = function (name) {

		console.log("changed " + name + " " self.callback.length);

		for(prop in self.callback) {
			if (self.callback.hasOwnPropery(name)) self.callback[name]();
		}
	}

	return {
		registerChange:registerChange,
		change:change
	}

});