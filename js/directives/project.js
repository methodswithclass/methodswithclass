
app.directive('project', ['global', '$animate', function (global) {

	return {
		restrict:'E',
		scope:{
			info:'=',
			index:'@'
		},
		templateUrl:'views/project.html',
		link:function ($scope, element, attrs) {
			$scope.renderHtml = global.renderHtml;

			var openSpeed = 300;
			var open = false;

			$scope.clickImage = function (maxSep) {

				var $element = $("#sep" + index);

				console.log($element);

				if (!open) {
					$element.animate({height:maxSep}, openSpeed);

					open = true;
				}
				else {
					$element.animate({height:100}, openSpeed);

					open = false;
				}
			}
		}
	};

}]);