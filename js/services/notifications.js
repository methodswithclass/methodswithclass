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