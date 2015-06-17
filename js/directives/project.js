
app.directive('project', ['global', function (global) {

	var renderHtml = function () {

		return global.renderHtml;

	}

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:'views/project.html'
	};

}]);