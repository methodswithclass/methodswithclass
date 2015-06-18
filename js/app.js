var app = angular.module("methodswithclass", []);

app.run(function ($scope, parallax) {

	parallax.scroll($scope.projects)

	$("#projects").scroll(function () {
		
		parallax.scroll($scope.projects);

	});

	$(window).resize(function () {

		parallax.scroll($scope.projects);
	});

});