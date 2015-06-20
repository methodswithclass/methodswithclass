app.directive("blockinst", function () {

	return {

		link:function ($scope, element, attr) {

			if (attr.id == "blockInstnuplae") {

				alert(attr.id);

				document.getElementById(attr.id).innerHTML = "click icon to play";
			}

		}
	}
})