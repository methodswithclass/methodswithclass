app.directive('contact', ['global', function (global) {

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		template: '<div ng-include="getContentUrl()"></div>',
		link:function (scope, element, attr) {

			scope.getContentUrl = function() {
                return 'views/' + attr.view;
            }

			scope.renderHtml = global.renderHtml;

		}
	};

}]);