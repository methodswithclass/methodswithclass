app.directive('parallax', ['global', 'parallaxService', function (global, parallax) {

	var link = function (scope, element, attr) {

		//console.log("here");

		var projects = scope.scrollItems;

		var scroll = function () {

			console.log("scroll");

			for (i in projects) {
				parallax.set(projects[i]);
			}
		}

		setTimeout(function() {
			scroll();
		}, 500);

		//angular.element($(global.project)).on('scroll', scroll);

		$(global.project).on('scroll', scroll);

		$(window).resize(scroll);
	}

	return {
		scope:{
			scrollItems:'='
		},
		link:link
	};

}]);