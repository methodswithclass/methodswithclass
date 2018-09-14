
uiModule.directive('block', ['states', '$window', "general", function (states, $window, general) {


	var shared = window.shared;
    var g = shared.utility_service;
    var send = shared.send_service;
    var react = shared.react_service;
    var events = shared.events_service;


	return {
		restrict:'E',
		scope:{
			info:'=',
			scroll:"@"
		},
		template: '<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {					

            var view;
            var aspect;

			$scope.getContentUrl = function() {
                
				if (g.isMobile()) {
					view = "m.block.html";
				}
				else {
					view = "d.block.html";
				}

                return 'assets/views/' + view;
            }

            var info = $scope.info;

			$scope.clicked = function () {

				console.log("clicked");

				if (info.id == "gravity") {
					$window.open(
						"http://gravity.methodswithclass.com",
						"_blank"
					);
				}
				else if (info.id == "evolve") {
					$window.open(
						"http://evolve.methodswithclass.com",
						"_blank"
					);
				}
				else if (info.id == "code") {
					$window.open(
						"http://code.methodswithclass.com",
						"_blank"
					);
				}
				else if (info.id == "end") {
					states.go("contact");
				}

			}

			$scope.trustHtml = function (html) {

                // console.log("html", general, html);

                return general.renderHtml(html);
            }

		}

	}

}]);