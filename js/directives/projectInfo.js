app.directive("projectInfo", function () {
	return {

		restrict:'E',
		scope:{
			'='
		},
		templateUrl:'views/projects.html'
	};

});