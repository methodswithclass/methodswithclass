app.factory("notifications", function () {

	var self = this;

	this.callback = {};
	this.localVariables = {};

	var register = function (name, callback) {

		console.log("registered " + name);

		if (typeof callback == Array) {

			console.log("callback is array");

			var local = [];

			for (i in callback) {

				if (i < callback.length - 1) {
					local[i] = callback[i];
				}
				else {
					self.callback[name] = callback[i];
				}

				self.localVariables[name] = local;

			}

		}
		else {

			console.log("callback is function");

			self.callback[name] = callback;
			self.localVariables[name] = "none";
		}

	}

	var call = function (name) {

		console.log("changed " + name);

		for(prop in self.callback) {

			if (self.callback.hasOwnProperty(name)) {

				if (self.localVariables[name] == "none") {
					self.callback[name]();
				}
				else {
					self.callback[name].apply(this, self.localVariables[name]);
				}
			}
		}

	}

	return {
		register:register,
		call:call
	}

});