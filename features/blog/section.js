blogModule.directive("section", ['global', function (g) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		template:'<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {

			$scope.getContentUrl = function() {
			
				var view;

				if (g.isMobile()) {

					view = "m.section.html";
				}
				else {
					view = "d.section.html";
				}

	            return 'features/views/' + view;
	        }

            // var bottom = $("#blog-bottom")[0] ? $("#blog-bottom").offset().top : 0;
            // var top = $("#blog-content").offset().top;

            // $("#blog-content").css({height:bottom - top});
			
		}
	}

}]);