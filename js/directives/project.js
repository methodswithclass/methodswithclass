
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
			var resizeHandlers = [];

			console.log(projects.length);

			$scope.renderHtml = global.renderHtml;

			var sep = function (project) {

				console.log("sep " + project.id);

				var windowWidth;
				var windowHeight;
				var sep;

				if (global.isMobile()) {

					windowWidth = 980;
					windowHeight = 1545;
					sep = project.mobileSep;
				}
				else {

					windowWidth = 1000;
					windowHeight = 1500;
					sep = project.maxSep;
				}

				var width = $(window).width()/windowWidth;
				var height = $(window).height()/windowHeight;

				var factor = 1/width;

				return factor*sep;
			}

			var setSep = function (info) {

				$("#sep" + info.id).css({height:sep(info)});
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

			$scope.projectsHeight = function (projects) {

				var sep = 0;

				for (i in projects) {

					sep += $scope.sep(projects[i]);
				}

				var result = projects.length*800 + sep;

				console.log(result);

				return result;
			}

			$scope.addText = function (id) {

				if (id == "nuplae") {
					return "click icon to play";

				}
				else return " ";

			}

			$scope.clickImage = function (info) {

				
				$element = $("#sep" + id);
				$space = $("#space" + id);

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