
app.directive('project', ['global', function (global) {

	return {
		renderHtml:global.renderHtml,
		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:'views/project.html'
	};

}]);