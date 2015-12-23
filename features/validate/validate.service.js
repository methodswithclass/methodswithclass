validateModule.factory("validate.service", ['$q', 'global', function ($q, g) {

	var self = this;

	var valid = g.c.valid;
	var invalid = g.c.invalid;

	var invalidate = function () {

		//console.log("validation default invalid");

		return $q(function (resolve) {
			resolve(valid);
		});
	}

	var complete = function (isValid, resolve) {

		//console.log("validation complete");

		if (isValid) {
			resolve(valid);
		}
		else {
			resolve(invalid);
		}

	}

	var run = function() {

		//console.log("run validate service");

		return $q(function (resolve) {

			complete(checkMobile(), resolve);

		});

	}

	
	return {

		run:run,
		invalidate:invalidate
	}


}]);