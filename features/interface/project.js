
uiModule.directive('project', ['global', '$window', function (g, $window) {

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		template: '<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {					

		    var view;

			$scope.getContentUrl = function() {
                
				if (g.isMobile()) {
					view = "m.project.html";
				}
				else {
					view = "d.project.html";
				}

                return 'features/views/' + view;
            }

			var $scrollElement = $("#" + attr.parent);
			var openSpeed = 300;
			var open = false;
			var $element;
			var $description;
			var $space;
			var resizeHandlers = {};

			$scope.renderHtml = g.renderHtml;

			var setSep = function (info) {

				$("#sep" + info.id).css({height:g.sep(info) + "px"});
			}


			var bindResize = function (info) {

				setSep(info);

				resizeHandlers[info.id] =  function () {
					setSep(info);
				}

				angular.element($window).bind('resize', resizeHandlers[info.id]);
			}

			var unbind = function (info) {

				angular.element($window).unbind('resize', resizeHandlers[info.id]);
			}

			$scope.onTap = function (info) {

				console.log("tapped");

				if (info.id == "nuplae") {
					window.open(
						"http://nuplae.methodswithclass.com",
						"_blank"
					);
				}

			}


			$scope.attachResize = function(info) {
				bindResize(info);
			}

			$scope.addText = function (id) {

				if (id == "nuplae") {
					return "click icon to play";

				}
				else return " ";

			}

			$scope.clickImage = function (info) {

				$element = $("#sep" + info.id);
				$space = $("#space" + info.id);
				$description = $("#desc" + info.id);

				if (!open) {

					$description.removeClass("font-50 text-center");

					$description.html(info.description);

					$element.animate({height:setSep(info)}, openSpeed, function () {
						bindResize(info);
						console.log("opened");
						$scrollElement.scrollTo($element, openSpeed);
					});

					open = true;
				}
				else {

					$description.addClass("font-50 text-center");

					$description.html("...");

					$element.animate({height:100}, openSpeed, function () {
						unbind(info);
						console.log("closed");
						$scrollElement.scrollTo($space, openSpeed);
					});

					open = false;
				}
			}
		}
	};

}]);