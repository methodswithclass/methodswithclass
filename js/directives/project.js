
app.directive('project', ['global', function (global) {

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:'views/project.html',
		link:function ($scope) {
			$scope.renderHtml = global.renderHtml;
		}
	};

}]);