
app.directive('project', ['global', function (global) {

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		template: '<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {

		    $scope.getContentUrl = function() {
            	return 'views/' + attr.view;
            }

			var $scrollElement = $("#" + attr.parent);
			var openSpeed = 300;
			var open = false;
			var $element;
			var $space;

			$scope.renderHtml = global.renderHtml;

			$scope.addText = function (id) {

				if (id == "nuplae") {
					return "click icon to play";

				}
				else return " ";

			}

			$scope.clickImage = function (info) {

				
				$element = $("#sep" + id);
				$space = $("#space" + id);

				if (!open) {
					$element.animate({height:$scope.main.sep(info)}, openSpeed, function () {

						console.log("opened");
						$scrollElement.scrollTo($element, openSpeed);
					});

					open = true;
				}
				else {
					$element.animate({height:100}, openSpeed, function () {

						console.log("closed");
						$scrollElement.scrollTo($space, openSpeed);
					});

					open = false;
				}
			}
		}
	};

}]);