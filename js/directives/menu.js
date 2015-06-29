
app.directive('menu', ['notifications', function (notifications) {

	var speed = 300;
			
	var link = function ($scope, element, attr) {

		var move = function (left) {

			notifications.change("menu");

			$("#" + attr.body).animate({left:left}, speed);
		}

		var action = function () {

			if ($scope.id == "projectBtn") {
				move(0);
			}
			else if ($scope.id == "contactBtn") {
				move("-100%");
			}
		}

		element.bind('mouseup', action);
		element.bind('touchend', action);
	}

	return {
		scope:{
			id:'@'
		},
		link:link
	}

}]);
