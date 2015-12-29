parallaxModule.directive('parallax', ['parallax.service', '$window', 'global', 'states', function (parallax, $window, g, states) {

	var link = function ($scope, element, attr) {

		var el = $("#" + $scope.scroll);

		var scroll = function () {
			if (states.current() == "home") {
				parallax.set({name:$scope.name, space:$scope.space, scroll:$scope.scroll, factor:$scope.factor, top:$scope.top, bottom:$scope.bottom});
			}
		}

		setTimeout(function() {
			scroll();
		}, 500);

		el.bind('scroll', scroll);

		angular.element($window).bind('resize', scroll);
	}

	return {
		scope:{
			name:"@",
			scroll:"@",
			factor:"@",
			top:"=",
			bottom:"@",
			space:"@"
		},
		link:link
	};

}]);