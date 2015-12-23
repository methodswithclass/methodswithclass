blogModule.directive("rotatable", ['global', '$compile', '$window', '$route', function (g, $compile, $window, $route) {


	return {
		restrict:'E',
		scope:false,
		templateUrl:"features/views/m.rotatable.html",
		link:function ($scope, element, attr) {

			var orientation = {};
			var land = {};
			var port = {};

			land.headerClass = "absolute top0 width-100 height gray-back z-10";
			land.title = "<div class='absolute right-20 width80 height'> " +
							"<div class='absolute width height rotate-counter-90'>" +
								"<div class='absolute width-700 text-center center white font-30'>" + $scope.main.title + "</div>" +
							"</div>" +
						"</div>";
			land.bodyClass = "absolute top0 left-100 mLandWidth height z-5 scrollY cutoffX touch";



			port.headerClass = "fixed height-100 width gray-back z-10";
			port.title = "<div class='absolute width80 height30 center'>" + 
							"<div class='absolute center white font-50'>" + $scope.main.title + "</div>" + 
						"</div>";
			port.bodyClass = "absolute top-100 mBodyHeight width z-5 scrollY cutoffX touch";


			orientation.land = land;
			orientation.port = port;


			var header = element.find("#header");
			var title = element.find("#title");
			var body = element.find("#body");


			$scope.renderOrientation = function () {

				var orient = g.getOrientation();

				header.removeClass(orientation[orient.isNot]["headerClass"]).addClass(orientation[orient.is]["headerClass"]);
				title.html(orientation[orient.is]["title"]).show();
				body.removeClass(orientation[orient.isNot]["bodyClass"]).addClass(orientation[orient.is]["bodyClass"]);

			}

			$scope.getWindowOrientation = function () {
				return $window.orientation;
			};

			$scope.$watch($scope.getWindowOrientation, function (newValue, oldValue) {

				$scope.renderOrientation()
			
			}, true);

			angular.element($window).bind('orientationchange', function () {
    			$scope.$apply();
  			});

		}
	}

}]);