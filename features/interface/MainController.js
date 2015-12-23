uiModule.controller('MainController', ['$scope', '$document', 'global', 'data.service', function ($scope, $document, g, data) {

	var self = this;

	self.pages = data.pages;

	$scope.getContentUrl = function() {
			
		var view;

		if (g.isMobile()) {
			console.log("load mobile home");
			view = "m.home.html";
		}
		else {
			console.log("load desktop home");
			view = "d.home.html";
		}

        return 'features/views/' + view;
    }

}]);