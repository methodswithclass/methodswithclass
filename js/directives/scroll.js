app.directive('scroll', ['parallax', function (parallax) {

	return {
		link:function (scope, element, attr) {

			var scroll = function () {

				parallax.scroll(attr.projects);
			}

			scroll();

			$("#projects").scroll(scroll);

			$(window).resize(scroll);

		}
	};

}]);