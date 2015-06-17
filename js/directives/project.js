
app.directive('project', ['global', '$animate', function (global, $animate) {

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:'views/project.html',
		link:function ($scope) {
			$scope.renderHtml = global.renderHtml;

			var open = false;

			$scope.clickImage = function (maxSep, index) {

				var element = document.getElementById("sep" + index);

				if (!open) {
					$animate.animate(element, {'height':'100px'}, {'height':maxSep});

					open = true;
				}
				else {
					$animate.animate(element, {'height':maxSep}, {'height':'100px'});

					open = false;
				}
			}
		}
	};

}]);