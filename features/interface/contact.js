uiModule.directive('contact', ['global', 'states', function (g, states) {

	return {
		restrict:'E',
		scope:false,
		replace:true,
		template: '<div class="relative width padding-bottom-20 border-bottom"><div class="relative width80 hcenter">{{}}</div></div>',
		link:function ($scope, element, attr) {

		}
	};

}]);