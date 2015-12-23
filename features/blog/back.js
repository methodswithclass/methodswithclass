blogModule.directive("back", ['states', function (states) {

	return {
		restrict:"E",
		scope:false,
		replace:true,
		template:"<div class='absolute width height white-back rounded10 pointer'><div class='absolute center font-30'>Home</div></div>",
		link:function ($scope, element, attr) {

			element.on("click", function () {

				states.go("home");

			});

		}
	}

}]);