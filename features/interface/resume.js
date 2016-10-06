uiModule.directive("resume", ['global', function (g) {

	return {
		restrict:"E",
		scope:false,
		replace:true,
		template: '<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {

			$scope.getContentUrl = function() {
                
				if (g.isMobile()) {
					view = "m.resume.html";
				}
				else {
					view = "d.resume.html";
				}

                return 'features/views/' + view;
            }

		}
	}

}]);