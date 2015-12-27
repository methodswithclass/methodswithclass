
uiModule.directive('block', ['global', 'states', '$window', function (g, states, $window) {

	return {
		restrict:'E',
		scope:{
			info:'=',
			scroll:"@"
		},
		template: '<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {					

		    var view;
		    var aspect;

			$scope.getContentUrl = function() {
                
				if (g.isMobile()) {
					view = "m.block.html";
				}
				else {
					view = "d.block.html";
				}

                return 'features/views/' + view;
            }

            var info = $scope.info;

            var elem = $("#parallax" + info.id);
            var space = $("#space" + info.id);

            var resizeElement = function (first) {

            	if (space.height() > $(window).height()*0.8) {
            		console.log("resize space");
            		space.css({height:$(window).height()*0.8});
            	}
            	
            	var elemHeight = elem.height();
            	var elemWidth = elem.width();
            	var spaceHeight = space.height()*1.2;
            	var spaceWidth = space.width()*1.2;
            	if (first) aspect = elemWidth/elemHeight;

            	if (elemHeight < spaceHeight) {
            		elem.css({height:spaceHeight, width:spaceHeight*aspect});
            	}
            	else if (elemWidth < spaceWidth) {
            		elem.css({width:spaceWidth, height:spaceWidth/aspect});
            	}
            }

            setTimeout(function () {

            	resizeElement(true);

            	//$("#sep" + info.id).css({height:info.sep + "px"});

            }, 100);

            $(window).resize(function () {
            	resizeElement(false);
            });
            

			$scope.clicked = function () {

				console.log("clicked");

				if (info.id == "nuplae") {
					$window.open(
						"http://nuplae.methodswithclass.com",
						"_blank"
					);
				}
				else if (info.id == "end") {
					states.go("contact");
				}

			}

		}

	}

}]);