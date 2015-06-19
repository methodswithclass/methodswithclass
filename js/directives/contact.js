app.directive('contact', ['global', function (global) {
	
	var view = "";

	if (global.isMobile()) {
		view = "mContact.html";
	}
	else {
		view = "contact.html";
	}

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:'views/' + view,
		link:function (scope, element, attr) {

			scope.renderHtml = global.renderHtml;

		}
	};

}]);