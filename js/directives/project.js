
app.directive('project', ['global', function (global) {

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:'views/project.html',
		link:function ($scope) {

			var openSpeed = 300;
			var open = false;

			$scope.renderHtml = global.renderHtml;

			$scope.clickImage = function (maxSep, id) {

				var $element = $("#sep" + id);

				var factor = $(window).height()*1500/$(window).width()/1000;

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