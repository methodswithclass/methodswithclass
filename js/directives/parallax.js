app.directive('parallax', ['parallaxService', '$window', function (parallax, $window) {

	var link = function (scope, element, attr) {

		console.log("parallax " + scope.id);

		var el = $(scope.id);

		// var classes = el.attr("class").split(" ");

		// for (i in classes) {
		// 	console.log("class " + classes[i]);
		// }

		var projects = scope.scrollItems;

		var scroll = function () {

			//console.log("scroll");

			for (i in projects) {
				parallax.set(projects[i]);
			}
		}

		setTimeout(function() {
			scroll();
		}, 500);

		//angular.element($(global.project)).on('scroll', scroll);

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