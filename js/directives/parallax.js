app.directive('parallax', ['parallaxService', '$document', '$window', function (parallax, $document, $window) {

	var link = function (scope, element, attr) {

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

		$document.bind('scroll', scroll);

		$window.resize(scroll);
	}

	return {
		scope:{
			scrollItems:'='
		},
		link:link
	};

}]);