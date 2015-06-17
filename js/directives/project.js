
app.directive('project', ['global', function (global) {

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:'views/project.html',
		link:function ($scope, global) {
			$scope.renderHtml = global.renderHtml;
		}
	};

}]);