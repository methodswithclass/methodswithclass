app.directive("blockinst", function () {

	return {

		link:function ($scope, element, attr) {

			if (attr.id == "blockInstnuplae") {

				alert(attr.id);

				$("#" + attr.id).text("click icon to play");
			}

		}
	}
})