
app.directive('project', ['global', '$animate', function (global, $animate) {

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:'views/project.html',
		link:function ($scope, element) {
			$scope.renderHtml = global.renderHtml;

			var open = false;

			var clickImage = function (maxSep) {

				if (!open) {
					$animate.animate(element, {height:100}, {height:maxSep});

					open = true;
				}
				else {
					$animate.animate(element, {height:100}, {height:maxSep});

					open = false;
				}
			}
	};

}]);