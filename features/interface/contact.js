uiModule.directive('contact', ['global', 'states', function (g, states) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		template: '<div class="absolute width height white-back rounded10 pointer" on-tap="clicked()"><div class="absolute font-40 center">contact</div></div>',
		link:function ($scope, element, attr) {

			$scope.clicked = function () {

				states.go("contact");
			}

		}
	};

}]);