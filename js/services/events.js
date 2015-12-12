app.factory("events", function () {

	var self = this;

	this.events = {};

	var on = function (name, _event) {

		self.events[name] = _event;
	}

	var dispatch = function (name) {

		self.events[name]();
	}

	return {
		on:on,
		dispatch:dispatch
	}

});