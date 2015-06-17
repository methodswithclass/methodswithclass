app.directive('projectInfo', function () {
	return {

		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:'views/project.html'
	};

});