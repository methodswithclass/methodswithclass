app.directive("blockinst", function () {

	return {

		link:function ($scope, element, attr) {

			if (attr.id == "blockInstnuplae") {

				element.text("click icon to play");
			}

		}
	}
})