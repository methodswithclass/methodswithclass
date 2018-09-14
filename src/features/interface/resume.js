uiModule.directive("resume", ["general", function (general) {


	var shared = window.shared;
    var g = shared.utility_service;
    var send = shared.send_service;
    var react = shared.react_service;
    var events = shared.events_service;


	return {
		restrict:"E",
		scope:false,
		replace:true,
		template: '<div class="relative" ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {

			$scope.getContentUrl = function() {
                
				var view;

				if (g.isMobile()) {
					view = "m.resume.html";
				}
				else {
					view = "d.resume.html";
				}

                return 'assets/views/' + view;
            }

            $scope.trustHtml = function (html) {

                // console.log("html", general, html);

                return general.renderHtml(html);
            }

		}
	}

}]);