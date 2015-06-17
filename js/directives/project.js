
app.directive('project', function () {

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:'views/project.html'
	};

});