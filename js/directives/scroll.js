app.directive('scroll', ['$scope', 'parallax', function ($scope, parallax) {

	return {
		link:function () {

			var scroll = function () {

				parallax.scroll($scope.projects);

			}

			scroll();

			$("#projects").scroll(scroll);

			$(window).resize(scroll);

		}
	};

}]);