app.factory("notifications", function () {

	var self = this;

	this.callback = {};
	this.localScopes = {};
	this.localVariables = {};

	function isFunction(functionToCheck) {
		 var getType = {};
		 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	var register = function (name, callback) {

		console.log("registered " + name);

		var local = [];

		var getScope = function (i) {

			self.localScopes[name] = callback[i];
		}

		var getLocal = function (i) {

			local[i] = callback[i];
		}

		var assignVariables = function() {

			self.localVariables[name] = local;
		}

		var getFunction = function (i) {

			self.callback[name] = callback[i];
		}

		if (Array.isArray(callback)) {

			console.log("callback is array");

			for (var i = 0; i < callback.length; i++) {

				if (i == 0) {
					getScope(i);
				}
				else {
					if (isFunction(callback[i])) {
						getFunction(i);
						break;
					}
					else {
						getLocal(i);
					}
				}
			}

			assignVariables();

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