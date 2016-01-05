uiModule.controller('MainController', ['$scope', 'global', 'data.service', function ($scope, g, data) {

	var self = this;

	self.blocks = data.blocks;

	$scope.getContentUrl = function() {
			
		var view;

		if (g.isMobile()) {
			//console.log("load mobile home");
			view = "m.home.html";
		}
		else {
			//console.log("load desktop home");
			view = "d.home.html";
		}

        return 'features/views/' + view;
    }

    $("#body").scrollTo(0);

}]);