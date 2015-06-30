app.directive("console", function () {

	var link = function ($scope, element, attr) {

		var vis = attr.vis;

		if (vis == "show") {
			element.show();
		}
		else {
			element.hide();
		}

	}

	return {
		template:"<div id='consoleContainer'><div id='console'></div></div>",
		link:link
	}
}]);