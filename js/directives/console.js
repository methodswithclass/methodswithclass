app.directive("console", function () {

	var link = function ($scope, element, attr) {
	
		var conCont = $("#consoleContainer");

		var vis = attr.vis;

		if (vis == "show") {
			conCont.show();
		}
		else {
			conCont.hide();
		}

	}

	return {
		template:"<div id='consoleContainer'><div id='console'></div></div>",
		link:link
	}
});