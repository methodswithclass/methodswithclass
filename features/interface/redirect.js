blogModule.directive("redirect", ['$location', function($location) {

	return {

		restrict:'E',
		scope:{
			name:'=',
			url:'@',
			size:'=',
			font:'='
		},
		templateUrl:"features/views/g.redirect.html",
		link:function($scope, element, attr) {

			$scope.changeLocation = function () {

				$location.url($scope.url);
			}

		}
	}

}]);