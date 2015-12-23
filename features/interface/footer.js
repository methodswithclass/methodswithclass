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

	   //      var setHeight = function () {

	   //      	var bottom = 0;

	   //      	// $(".blog-button-bottom").each(function () {

	   //      	// 	var _bottom = $(this).offset().top + $(this).height();

	   //      	// 	//console.log(_top);

	   //      	// 	if (_bottom > bottom) {
	   //      	// 		bottom = _bottom;
	   //      	// 	}

	   //      	// });

				// var bottom = $("#blog-buttons").offset().top + $("#blog-buttons").height() + 200;

	   //      	console.log(bottom);

	   //      	$("#footer").css({top:bottom});

	        	
	   //      }

	   //      setTimeout(function () {
		  //   	setHeight();
		  //   }, 1000);

	   //      $(window).resize(setHeight);
		}
	}
}]);