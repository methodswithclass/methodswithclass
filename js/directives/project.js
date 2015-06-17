
app.directive('project', ['global', function (global) {

	return {
		renderHTML:global.renderHTML,
		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:'views/project.html'
	};

}]);