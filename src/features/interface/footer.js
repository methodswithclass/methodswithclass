uiModule.directive("footer", ['$state', function ($state) {


	var shared = window.shared;
    var g = shared.utility_service;
    var send = shared.send_service;
    var react = shared.react_service;
    var events = shared.events_service;


	return {
		restrict:'E',
		scope:{},
		replace:true,
		templateUrl:"assets/views/g.footer.html",
		link:function ($scope, element, attr) {

			$scope.font = "font-20";

			if (g.isMobile()) $scope.font = "font-30";

		}
	}
}]);