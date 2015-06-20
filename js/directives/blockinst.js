app.directive("blockinst", function () {

	return {

		link:function ($scope, element, attr) {

			alert(attr.id);

			if (attr.id == "blockInstnuplae") {

				$("#" + attr.id).text("click icon to play");
			}

		}
	}
})