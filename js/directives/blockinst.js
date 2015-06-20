app.directive("blockinst", function () {

	return {

		link:function ($scope, element, attr) {

			if (attr.id == "blockInstnuplae") {

				element.find(attr.id).text("click icon to play");
			}

		}
	}
})