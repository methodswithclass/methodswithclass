app.directive('projectInfo', function () {
	return {

		restrict:'E',
		scope:{
			projectInfo:'=info'
		},
		templateUrl:'views/project.html'
	};

});