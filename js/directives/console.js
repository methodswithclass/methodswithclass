app.directive("console", ['con', function (con) {

	var link = function ($scope, element, attr) {
	
		var conCont = $("#consoleContainer");

		var vis = attr.vis;

		if (vis == "show") {
			conCont.show();
		}
		else {
			conCont.hide();
		}

		con.register($("#console"));

	}

	return {
		template:"<div id='consoleContainer'><div id='console'></div></div>",
		link:link
	}
}]);