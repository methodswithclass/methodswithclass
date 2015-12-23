blogModule.directive("btn", ['$location', 'global', 'data.service', 'states', function ($location, g, blogs, states) {

	return {
		restrict:'E',
		scope:{
			data:"=",
			deviceShape:"@",
			deviceFont:"@",
			initial:"@"
		},
		replace:true,
		templateUrl:"features/views/g.btn.html",
		link:function($scope, element, attr) {


			if ($scope.data) {

				var setButtonPosition = function () {

					var position = blogs.getButtonPosition($scope.data.meta_data.index);
					var width = element.parent().width()/position.cols;

					var pageHeight = $(window).height();
					var headerHeight = $("#spacehome").height();
					var footerHeight = 100;
					var fillSpace = pageHeight - headerHeight - footerHeight;
					var buttonHeight = position.rows*width;

					$("#button-group").css({height:Math.max(buttonHeight, fillSpace)});

					element.addClass("cutoff");

					element.css({width:width, height:width, top:position.y*width, left:position.x*width});

				}

				setButtonPosition();

				$(window).resize(setButtonPosition);

				element.on("click", function () {

					console.log("clicked " + $scope.data.meta_data.name);

					states.go($scope.data.meta_data.name);

				});

			}

		}

	}
}]);