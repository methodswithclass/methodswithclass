app.factory("notifications", function () {

	this.callback = {};
	this.localVariables = {};

	var register = function (name, callback) {

		console.log("registered " + name);

		if (typeof callback == Array) {

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