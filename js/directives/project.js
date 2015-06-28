
app.directive('project', ['global', '$window', function (global, $window) {

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		template: '<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {

		    $scope.getContentUrl = function() {
            	return 'views/' + attr.view;
            }

			var $scrollElement = $("#" + attr.parent);
			var openSpeed = 300;
			var open = false;
			var $element;
			var $space;
			var resizeHandlers = {};

			$scope.renderHtml = global.renderHtml;

			var sep = function (project) {


				var percent;

				if (global.isMobal()) {
					percent = 0.4;
				}
				else {
					percent = 0.8;
				}

				var windowWidth = 1600;
				var sep = project.maxSep;
				var factor = windowWidth/$(window).width()/percent;

				return factor*sep;
			}

			var setSep = function (info) {

				$("#sep" + info.id).css({height:sep(info) + "px"});
			}


			var bindResize = function (info) {

				setSep(info);

				resizeHandlers[info.id] =  function () {
					setSep(info);
				}

				angular.element($window).bind('resize', resizeHandlers[info.id]);
			}

			var unbind = function (info) {

				angular.element($window).unbind('resize', resizeHandlers[info.id]);
			}


			$scope.attachResize = function(info) {
				bindResize(info);
			}

			// $scope.projectsHeight = function (projects) {

			// 	var sep = 0;

			// 	for (i in projects) {

			// 		sep += $scope.sep(projects[i]);
			// 	}

			// 	var result = projects.length*800 + sep;

			// 	console.log(result);

			// 	return result;
			// }

			$scope.addText = function (id) {

				if (id == "nuplae") {
					return "click icon to play";

				}
				else return " ";

			}

			$scope.clickImage = function (info) {

				$element = $("#sep" + info.id);
				$space = $("#space" + info.id);

				if (!open) {
					$element.animate({height:setSep(info)}, openSpeed, function () {
						bindResize(info);
						console.log("opened");
						$scrollElement.scrollTo($element, openSpeed);
					});

					open = true;
				}
				else {
					$element.animate({height:100}, openSpeed, function () {
						unbind(info);
						console.log("closed");
						$scrollElement.scrollTo($space, openSpeed);
					});

					open = false;
				}
			}
		}
	};

}]);