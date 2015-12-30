parallaxModule.directive('parallax', ['parallax.service', '$window', 'global', 'states', function (parallax, $window, g, states) {

	var link = function ($scope, element, attr) {

		var el = $("#" + $scope.scroll);

		var image = new parallax.imageAdjust();

		var scroll = function () {
			if (states.current() == "home") {
				parallax.set({name:$scope.name, space:$scope.space, scroll:$scope.scroll, factor:$scope.factor, top:$scope.top, bottom:$scope.bottom});
			}
		}

		setTimeout(function() {
			scroll();
			image.fix({name:$scope.name, space:$scope.space, first:true});
		}, 300);

		el.bind('scroll', scroll);

		angular.element($window).bind('resize', function () {
			scroll();
			image.fix({name:$scope.name, space:$scope.space, first:false});
		});
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