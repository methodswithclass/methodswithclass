
app.directive('menu', ['notifications', function (notifications) {

	var speed = 300;
			
	var link = function ($scope, element, attr) {

		var move = function (left) {

			$("#" + attr.body).animate({left:left}, speed);
		}

		var action = function () {

			if ($scope.id == "projectBtn") {
				move(0);
				notifications.change($scope.id);
			}
			else if ($scope.id == "contactBtn") {
				move("-100%");
				notifications.change($scope.id);
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

});
