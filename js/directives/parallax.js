app.directive('parallax', ['parallaxService', '$window', function (parallax, $window) {

	var link = function ($scope, element, attr) {

		var el = $("#" + $scope.id);

		var projects = $scope.scrollItems;

		var scroll = function () {

			for (i in projects) {
				parallax.set(projects[i]);
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
			scrollItems:'=',
			id:'@'
		},
		link:link
	};

}]);