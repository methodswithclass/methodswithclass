
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

            var icon = "<div class='absolute bottom-50 left-50 width-200 height-200 border rounded20 cutoff pointer' on-tap='clicked()'><img class='absolute width height' src='img2/mesh.jpg'/></div>";

            var contact = "<div class='absolute top10 left10 width-200 height-50 z-10' on-tap='clicked()'><div class='absolute width height white-back rounded10 pointer'><div class='absolute font-40 center'>contact</div></div></div>";

            var resizeElement = function () {

            	var elem = $("#parallax" + info.id);
            	var space = $("#space" + info.id);
            	var elemHeight = elem.height();
            	var elemWidth = elem.width();
            	var spaceHeight = space.height()*1.2;
            	var spaceWidth = space.width()*1.2;
            	var aspect = elem.width()/elem.height();

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

            	// if (info.id == "nuplae") $("#space" + info.id).append(icon);

            	// if (info.id == "end") $("#space" + info.id).append(contact);

            }, 100);

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