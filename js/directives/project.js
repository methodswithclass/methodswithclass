
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

			var setSep = function (projects) {
				for (i in projects) {
					$("#sep" + projects[i].id).css({height:sep(projects[i])});
				}
			}


			$scope.attachResize = function(projects) {

				setSep(projects);

				angular.element($window).bind('resize', function () {
					setSep(projects);
				});
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
					$element.animate({height:$scope.sep(info)}, openSpeed, function () {

						console.log("opened");
						$scrollElement.scrollTo($element, openSpeed);
					});

					open = true;
				}
				else {
					$element.animate({height:100}, openSpeed, function () {

						console.log("closed");
						$scrollElement.scrollTo($space, openSpeed);
					});

					open = false;
				}
			}
		}
	};

}]);