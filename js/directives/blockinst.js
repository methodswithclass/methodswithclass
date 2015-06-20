app.directive("blockinst", function () {

	return {

		link:function ($scope, element, attr) {

			$scope.addText = function (id) {

				if (id == "nuplae") {
					return "click icon to play";

				}
				else return " ";

			}

			

		}
	}
})