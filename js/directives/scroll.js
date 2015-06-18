app.directive('scroll', ['parallax', function (parallax) {

	return {
		link:function (scope) {

			scope.parallax = parallax.scroll;
		}
	};

}]);