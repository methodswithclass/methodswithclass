
uiModule.directive('block', ['global', 'states', function (g, states) {

	return {
		restrict:'E',
		scope:{
			info:'=',
			scroll:"@"
		},
		template: '<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {					

		    var view;

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

            var resizeElement = function () {

            	var elem = $("#parallax" + info.id);
            	var space = $("#space" + info.id);
            	var elemHeight = elem.height();
            	var elemWidth = elem.width();
            	var spaceHeight = space.height()*1.2;
            	var spaceWidth = space.width()*1.2;
            	var aspect = elemWidth/elemHeight;

            	if (elemHeight < spaceHeight) {
            		elem.css({height:spaceHeight, width:spaceHeight*aspect});
            	}
            	else if (elemWidth < spaceWidth) {
            		elem.css({width:spaceWidth, height:spaceWidth/aspect});
            	}
            }

            setTimeout(function () {

            	resizeElement();

            	$("#sep" + info.id).css({height:info.sep + "px"});

            }, 500);

            $(window).resize(resizeElement);
            

			$scope.clicked = function () {

				console.log("clicked");

				if (info.id == "nuplae") {
					window.open(
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