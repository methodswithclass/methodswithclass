
app.directive('project', ['global', function (global) {

	var renderHtml = function () {

		return global.renderHtml;

	}

	return {
		renderHtml:renderHtml,
		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:'views/project.html'
	};

}]);