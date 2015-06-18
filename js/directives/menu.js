
app.directive('menu', ['global', function (global) {

	var speed = 300;

	var move = function (left) {

		$(global.body).animate({left:left}, speed);
	}


			
	var link = function (scope, element, attr) {

		var action = function () {

			if (attr.id == "projectBtn") {
				move(0);
			}
			else if (attr.id == "contactBtn") {
				move("-100%");
			}
		}

		element.bind('mouseup', action);
		element.bind('touchend', action);
	}

	return {

		link:link
	}

}]);
