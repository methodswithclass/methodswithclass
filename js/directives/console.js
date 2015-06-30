app.directive("console", ['con', function (con) {

	var link = function ($scope, element, attr) {

		var vis = attr.vis;

		if (vis == "show") {
			element.show();
		}
		else {
			element.hide();
		}

		con.register(element);

	}

	return {
		template:"<div id='consoleContainer'><div id='console'></div></div>",
		link:link
	}
}]);