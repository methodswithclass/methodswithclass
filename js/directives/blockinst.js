app.directive("blockinst", function () {

	return {

		link:function ($scope, element, attr) {

			alert(attr.id);

			if (attr.id == "blockInstnuplae") {

				element.find(attr.id).text("click icon to play");
			}

		}
	}
})