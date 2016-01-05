uiModule.directive("footer", ['global', '$state', function (g, $state) {

	return {
		restrict:'E',
		scope:{},
		replace:true,
		templateUrl:"features/views/g.footer.html",
		link:function ($scope, element, attr) {

			$scope.font = "font-20";

			if (g.isMobile()) $scope.font = "font-30";

		}
	}
}]);