
app.directive('project', ['global', function (global) {

	var view = "";

	if (global.isMobile()) {
		view = "mProject.html";
	}
	else {
		view = "project.html";
	}

	//alert(view);

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:"/views/" + view,
		link:function ($scope, element, attr) {

			var openSpeed = 300;
			var open = false;

			$scope.renderHtml = global.renderHtml;

			$scope.addText = function (project, id) {

				alert(id + " " + project.id);

				if (id == project.id) {
					$('#blockInst' + id).text("click the icon to play");
				}
			}

			$scope.clickImage = function (maxSep, id) {

				var $scrollElement = $(global.project);
				var $element = $("#sep" + id);

				var factor = $(window).height()*1500/$(window).width()/1000;

				if (!open) {
					$element.animate({height:factor*maxSep}, openSpeed, function () {

						console.log("done");
						$scrollElement.scrollTo($element, openSpeed);
					});

					open = true;
				}
				else {
					$element.animate({height:100}, openSpeed, function () {

						console.log("done");
						$scrollElement.scrollTo($element, openSpeed);
					});

					open = false;
				}
			}
		}
	};

}]);