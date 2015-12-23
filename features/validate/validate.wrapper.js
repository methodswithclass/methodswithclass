validateModule.factory("validate.wrapper", ['$q', 'validate.service', 'events', 'global', function ($q, validate, events, g) {


	var run = function () {

		return $q(function (resolve) {

			var isValid;
			var isRegistered = false;
			
			var proceed = function () {
				
				if (g.c.forceMobile) {
					isValid = validate.invalidate();
				}
				else {
					isValid = validate.run();
				}

				isValid.then( 
				function (path) { //valid
					//console.log("is valid");
					resolve(path)
				});

			}

			var timer = setInterval(function () {

				isRegistered = events.dispatch("console");

				//console.log(isRegistered);

				if (isRegistered) {
					clearInterval(timer);
					timer = null;
					proceed();
				}


			}, 10);

		});

	}

	return {
		run:run
	}

}]);