
app.directive('project', ['global', '$window', function (global, $window) {

	return {
		restrict:'E',
		scope:{
			info:'='
		},
		template: '<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {

			var id = $scope.info.id;

			if (id == "nuplae") {

				var $block = element.find("#block" + id);

				console.log($block[0]);

				angular.element($block).on("load", function () {

					console.log("loaded");

					var press = new Hammer($block[0]);

					press.get('press').set({time:1, threshold:10});

					press.on('pressup', function (e) {

						console.log("link pressed");
						
						window.open(
							 'http://nuplae.methodswithclass.com',
							  '_blank' // <- This is what makes it open in a new window.
						);
					});

				});

			}
			else {
				console.log("no nuplae");
			}

		    $scope.getContentUrl = function() {
            	return 'views/' + attr.view;
            }

			var $scrollElement = $("#" + attr.parent);
			var openSpeed = 300;
			var open = false;
			var $element;
			var $description;
			var $space;
			var resizeHandlers = {};

			$scope.renderHtml = global.renderHtml;

			var setSep = function (info) {

				$("#sep" + info.id).css({height:global.sep(info) + "px"});
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

			$scope.addText = function (id) {

				if (id == "nuplae") {
					return "click icon to play";

				}
				else return " ";

			}

			$scope.clickImage = function (info) {

				$element = $("#sep" + info.id);
				$space = $("#space" + info.id);
				$description = $("#desc" + info.id);

				if (!open) {

					$description.removeClass("font-50 text-center");

					$description.html(info.description);

					$element.animate({height:setSep(info)}, openSpeed, function () {
						bindResize(info);
						console.log("opened");
						$scrollElement.scrollTo($element, openSpeed);
					});

					open = true;
				}
				else {

					$description.addClass("font-50 text-center");

					$description.html("...");

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