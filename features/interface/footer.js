uiModule.directive("footer", ['global', function (g) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		template:'<div class="absolute width height" ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {

			$scope.getContentUrl = function() {
			
				var view;

				if (g.isMobile()) {

					view = "m.footer.html";
				}
				else {
					view = "d.footer.html";
				}

	            return 'features/views/' + view;
	        }

	        var setHeight = function () {

				var pageHeight = $(window).height();
				var footerHeight = 100;
				var fillSpace = pageHeight - footerHeight;
				var contentHeight = $("#content").height();

				console.log("fill: " + fillSpace + " content: " + contentHeight);
				console.log(element.parent());

				element.parent().css({top:Math.max(contentHeight, fillSpace)});

			}

			setTimeout(function () {

				setHeight();				
			}, 500);

			

			$(window).resize(setHeight);
		}
	}
}]);