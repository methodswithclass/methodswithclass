parallaxModule.directive('parallax', ['parallax.service', '$window', 'global', function (parallax, $window, g) {

	var link = function ($scope, element, attr) {

		var el = $("#" + $scope.scroll);

		var first;
		var start;
		var active;

		var scroll = function () {
			parallax.set({name:$scope.name, space:$scope.space, factor:$scope.factor, top:$scope.top, bottom:$scope.bottom, start:start});
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