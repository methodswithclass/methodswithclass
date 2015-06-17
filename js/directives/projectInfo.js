app.directive("projectInfo", function () {
	return {

		restrict:'E',
		scope:{
			projectInfo:'='
		},
		templateUrl:'views/projects.html'
	};

});