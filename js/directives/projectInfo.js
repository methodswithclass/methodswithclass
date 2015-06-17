app.directive("projectInfo", function () {
	return {

		restrict:'E',
		scope:{
			project:'='
		},
		templateUrl:'/views/projects.html'
	};

});