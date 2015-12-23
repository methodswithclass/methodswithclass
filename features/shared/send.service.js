sharedModule.factory("send", function () {

	var saved = {};
	var savedNames = [];

	var receivers = {};
	var names = [];

	var checkArray = function (_item, array) {

		for (i in array) {

			if (_item == array[i]) {

				return true;
			}
		}

		return false;
	}

	var isArray = function (array) {

		if( Object.prototype.toString.call( array ) === '[object Array]' ) {
		   return true;
		}

		return false;
	}

	var setup = function () {

		this.receiver = function (params) {

			var name = params.name;

			var bin;

			if (!checkArray(name, names)) {

				bin = []; //create new receiver array for this name
			}
			else {
				bin = receivers[name]; // retrieve existing receiver array for this name
			}

			//console.log("receive " + name + " bin size: " + bin.length);

			bin[bin.length] = params.receiver;

			receivers[name] = bin; //reassign bin to receiver

			names[names.length] = name;
		}

		this.save = function (params) {

			var name = params.name;

			var bin;

			if (!checkArray(name, savedNames)) {

				bin = []; //create new receiver array for this name
			}
			else {
				bin = saved[name]; // retrieve existing receiver array for this name
			}

			//console.log("receive " + name + " bin size: " + bin.length);

			bin[bin.length] = params.data;

			saved[name] = bin; //reassign bin to receiver

			savedNames[savedNames.length] = name;

		}

	}

	var retrieve = function () {

		this.accum = function (params) {

			var name = params.name;
			var id = params.id;

			var bin = receivers[name];

			for (i in bin) {

				bin[i][id] = params.data;
			}

		}

		this.get = function (params) {

			var name = params.name;

			var bin = saved[name];

			if (bin) {
				return bin;
			}

			return "none";

		}

	}

	

	return {

		setup:new setup(),
		retrieve:new retrieve()
	}

});