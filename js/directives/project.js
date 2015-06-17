
app.directive('project', ['global', '$animate', function (global) {

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

				var element = $("#sep" + index);

				if (!open) {
					element.animate({height:maxSep}, openSpeed);

					open = true;
				}
				else {
					element.animate({height:100});

					open = false;
				}
			}
		}
	};

}]);