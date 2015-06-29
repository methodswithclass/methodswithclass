app.factory("notifications", function () {

	var self = this;

	this.callback = {};
	this.localScopes = {};
	this.localVariables = {};

	var register = function (name, callback) {

		console.log("registered " + name);

		if (Array.isArray(callback)) {

			console.log("callback is array");

			var local = [];

			for (var i = 0; i < callback.length; i++) {

				if (i == 0) {
					self.localScopes[name] = callback[i];
				}
				else if (i < callback.length - 1) {
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
			self.localScopes[name] = "none";
			self.localVariables[name] = "none";
		}

	}

	var call = function (name) {

		console.log("changed " + name);

		for(prop in self.callback) {

			if (self.callback.hasOwnProperty(name)) {

				if (self.localScopes[name] == "none") {
					self.callback[name]();
				}
				else {

					console.log("local variables " + self.localVariables[name].length);

					self.callback[name].apply(self.localScopes[name], self.localVariables[name]);
				}
			}
		}

	}

	return {
		register:register,
		call:call
	}

});