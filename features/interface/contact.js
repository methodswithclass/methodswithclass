uiModule.directive('contact', ['global', function (g) {

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		template: '<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {

			var view;

			$scope.getContentUrl = function() {
                
				if (g.isMobile()) {
					view = "m.contact.html";
				}
				else {
					view = "d.contact.html";
				}

                return 'features/views/' + view;
            }

			$scope.renderHtml = g.renderHtml;

		}
	};

}]);