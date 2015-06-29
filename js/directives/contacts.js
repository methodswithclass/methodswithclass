app.directive("contacts", ['global', function (global) {

	return {

		link:function ($scope, element, attr) {

			$scope.contactHeight = function () {

				var result = "2500px";

				console.log(result);

				return {"height":result};
			}
		}
	}

}]);