
uiModule.directive('menu', ['events', function (events) {

	var speed = 300;
			
	var link = function ($scope, element, attr) {

		var body = $("#" + attr.body);

		var contactLeft = -$(window).width();

		var move = function (left) {

			if (body.offset().left != left) {
				body.animate({left:left}, speed);
			}
		}

		var action = function () {

			if ($scope.id == "projectBtn") {
				move(0);
			}
			else if ($scope.id == "contactBtn") {
				move(contactLeft);
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
