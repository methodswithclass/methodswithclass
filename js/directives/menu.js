
app.directive('menu', function () {

	var speed = 300;
			
	var link = function (scope, element, attr) {

		var move = function (left) {

			$(scope.body).animate({left:left}, speed);
		}

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
		scope:{
			body:'='
		},
		link:link
	}

});
