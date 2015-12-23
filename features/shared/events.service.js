sharedModule.factory("events", function ($q) {

	var self = this;

	this.events = {};
	this.triggers = {};
	this.defers = {};
	this.promises = {};

	var future = function (name) {

		try {

			self.promises[name].resolve();

			return true;
		}
		catch (e) {

			return false;
		}
	}

	var defer = function (name, _config) {

		self.promises[name] = $q.defer();

		self.promises[name].promise.then(function () {
			
			if (_config) return _config();
			return false;
		});

		return self.promises[name];
	}

	var dispatch = function (name) {

		var result;

		try {

			return self.events[name]();
		}
		catch (e) {

			return false;
		}

	}

	var on = function (name, _event) {

		self.events[name] = _event;

	}

	var createTriggerSet = function (name) {

		console.log("for " + name + " create trigger set");

		self.triggers[name] = [];

		return self.triggers[name];
	}

	var getTriggerSet = function (name) {

		var triggerSet = self.triggers[name];

		if (triggerSet) {

			console.log("for " + name + " get existing trigger set");

			return triggerSet;
		}

		return [];
	}

	var refactorTriggers = function (name) {

		var triggerSet = getTriggerSet(name);

		for (i in triggerSet) {

			triggerSet[i].index = i;
		}
	}

	var sortTriggers = function (name) {

		var triggerSet = getTriggerSet(name);

		if (triggerSet.length > 1) {

			triggerSet.sort(function(a,b) {

				if (a.index == b.index) {
					return a.sub - b.sub;
				}

				return a.index - b.index;
			});

			refactorTriggers(name);

		}

	}

	var getTriggerByIndex = function (name, trigger_index) {

		var triggerSet = getTriggerSet(name);

		for (i in triggerSet) {

			if (triggerSet[i].index == trigger_index) {

				return triggerSet[i];
			}
		}

		return {name:"none", index:-1};
	}

	var getTriggerByName = function (name, trigger_name) {

		var triggerSet = getTriggerSet(name);

		for (i in triggerSet) {

			if (triggerSet[i].name == trigger_name) {

				return triggerSet[i];
			}
		}

		return {name:"none", index:-1}; 
	}

	var getTriggerByInput = function (name, input) {

		var trigger;

		//console.log("getting trigger in set " + name + " with id " + input);

		if (input >= 0) {

			trigger = getTriggerByIndex(name, input);
		}
		else if (input.length > 0) {
			trigger = getTriggerByName(name, input);
		}
		else {

			trigger = {name:"none", index:-1};
		}

		return trigger;
	}

	var doesTriggerSetExist = function (name) {

		if (self.triggers[name]) {
			return true;
		}

		return false;
	}

	var doesTriggerExist = function (name, input) {

		var trigger;

		if (doesTriggerSetExist(name)) {

			trigger = getTriggerByInput(name, input);

			console.log("trigger index is " + trigger.index);

			if (trigger.index >= 0) {
				return true;
			}
		}

		return false;
	}

	var addTrigger = function (name, params) {

		var triggerSet;

		if (doesTriggerSetExist(name)) {
			triggerSet = getTriggerSet(name);
		}
		else {

			triggerSet = createTriggerSet(name);
		}

		if (params)  {

			console.log("add trigger " + name + " with name " + params.name);
			
			triggerSet.push(params);
			
			sortTriggers(name);
		}
		else {
			console.log("no set to add to _or_ no trigger to add");
		}
	}

	var runTriggers = function (name, params) {

		var low = params.low;
		var high;

		if (low instanceof Number) {
			high = params.high;
		}
		else if (params.all) {
			low = 0;
			high = triggerSet.length-1;
		}

		var deferred = $q.defer();

		var promise = deferred.promise;

		for (var i = low; i <= high; i++) {

			promise.then(function (result) {

				var trigger = getTriggerByIndex(name, i);

				if (trigger.name != "none"){

					console.log("run trigger " + trigger.name);

					trigger.callback();
				}
				else {
					console.log("no trigger to run");
				}

				return true;
			});
		}

		deferred.resolve();
	}

	var waitForTriggerToExist = function (name, input) {

		return $q(function (resolve) {

			console.log("waiting for " + input + " in set " + name + " to exist");

			var wait = setInterval(function () {

				if (doesTriggerExist(name, input)) {

					clearInterval(wait);
					wait = null;
					resolve();
				}

			}, 100);

		});
	}

	var runTrigger = function (name, input) {

		self.defers[name] = waitForTriggerToExist(name, input);

		self.defers[name].then(function () {

			var trigger = getTriggerByInput(name, input);

			trigger.callback();
		});

	}

	var clearTriggers = function (name) {

		self.triggers[name] = [];
	} 

	return {
		on:on,
		dispatch:dispatch,
		defer:defer,
		future:future,
		addTrigger:addTrigger,
		runTriggers:runTriggers,
		runTrigger:runTrigger,
		clearTriggers:clearTriggers
	}

});