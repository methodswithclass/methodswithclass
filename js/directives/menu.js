
app.directive('menu', ['global', function (global) {

	var speed = 300;

	var move = function (left) {

		$(global.body).animate({left:left}, speed);
	}
			
	var link = function (scope, element, attr) {

		if (element.id == "projectBtn") {
			move(0);
		}
		else if (element.id == "contactBtn") {
			move("-100%");
		}

	}

	return {

		link:link
	}

}]);
