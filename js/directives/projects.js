app.directive("projects", ['global', function (global) {

	return {

		link:function ($scope, element, attr) {

			$scope.projectHeight = function (projects) {

				var sep = 0;

				for (i in projects) {

					sep += global.sep(projects[i]);
				}

				var result = projects.length*800 + sep;

				//console.log(result);

				return {"height":result + "px"};
			}
		}
	}
}]);