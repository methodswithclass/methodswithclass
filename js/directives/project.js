
app.directive('project', ['global', 'parallax', function (global, parallax) {

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:'views/project.html',
		link:function ($scope, element, attr) {

			var openSpeed = 300;
			var open = false;

			var scroll = function () {
				parallax.set($scope.info);
			}

			$scope.renderHtml = global.renderHtml;

			$scope.clickImage = function (maxSep, id) {

				var $scrollElement = $("#bodyContainer");
				var $element = $("#sep" + id);

				var factor = $(window).height()*1500/$(window).width()/1000;

				if (!open) {
					$element.animate({height:factor*maxSep}, openSpeed, function () {

						console.log("done");

						scroll();

						$scrollElement.scrollTo($element, openSpeed);
					});

					open = true;
				}
				else {
					$element.animate({height:100}, openSpeed, function () {

						console.log("done");
						scroll();
						//$scrollElement.scrollTo($element, openSpeed);
					});

					open = false;
				}
			}
		}
	};

}]);