app.directive('contact', ['global', function (global) {
	return {
		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:'/views/contact.html',
		link:function (scope, element, attr) {

			scope.renderHtml = global.renderHtml;

		}
	};

}]);