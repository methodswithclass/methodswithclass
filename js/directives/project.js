
app.directive('project', ['global', function (global) {

	var renderHtml = global.renderHtml;

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:'views/project.html'
	};

}]);