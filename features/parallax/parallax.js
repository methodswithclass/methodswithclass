parallaxModule.directive('parallax', ['parallax.service', '$window', 'global', function (parallax, $window, g) {

	var link = function ($scope, element, attr) {

		var el = $("#" + $scope.scroll);

		var scroll = function () {
			parallax.set({name:$scope.name, factor:$scope.factor, top:$scope.top, bottom:$scope.bottom});
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
			bottom:"@"
		},
		link:link
	};

}]);