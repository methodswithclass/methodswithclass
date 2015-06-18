app.directive('scroll', ['MainController', 'parallax', function (main, parallax) {

	return {
		link:function () {

			var scroll = function () {

				parallax.scroll(main.projects);

			}

			scroll();

			$("#projects").scroll(scroll);

			$(window).resize(scroll);

		}
	};

}]);