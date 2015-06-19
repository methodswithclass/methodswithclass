app.directive('contact', ['global', function (global) {
	return {
		restrict:'E',
		scope:{
			info:'=',
			view:'='
		},
		templateUrl:'views/' + scope.view,
		link:function (scope, element, attr) {

			scope.renderHtml = global.renderHtml;

		}
	};

}]);