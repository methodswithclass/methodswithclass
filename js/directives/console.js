app.directive("console", ['con', function (con) {

	var link = function ($scope, element, attr) {

		var vis = attr.vis;

		if (vis == "show") {
			element[0].show();
		}
		else {
			element[0].hide();
		}

		con.register(element[0]);

	}

	return {
		template:"<div id='consoleContainer'><div id='console'></div></div>",
		link:link
	}
}]);