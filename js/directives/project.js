
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

				var factor = $(window).height()/$(window).width();

				if (!open) {
					$element.animate({height:factor*maxSep}, openSpeed, function () {

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