
app.directive('project', ['global', function (global) {

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:'views/project.html',
		link:function ($scope, element, attrs) {
			$scope.renderHtml = global.renderHtml;

			var openSpeed = 300;
			var open = false;

			$scope.clickImage = function (maxSep, id) {

				var $element = $("#sep" + id);

				console.log(maxSep);
				console.log($element.height());

				if (!open) {
					$element.animate({height:maxSep}, openSpeed, function () {

						console.log("done");
					});

					open = true;
				}
				else {
					$element.animate({height:100}, openSpeed, function () {

						console.log("done");
					});

					open = false;
				}
			}
		}
	};

}]);