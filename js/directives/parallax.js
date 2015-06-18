app.directive('parallax', ['parallax', function (parallax) {

	var link = function (scope, element, attr) {

		//console.log("here");

		var projects = scope.scrollItems;

		var scroll = function () {
			for (i in projects) {
				parallax.set(projects[i]);
			}
		}

		setTimeout(function() {
			scroll();
		}, 500);

		angular.element($("#bodyContainer")).on('scroll', scroll);

		$(window).resize(scroll);
	}

	return {
		scope:{
			scrollItems:'='
		},
		link:link
	};

}]);