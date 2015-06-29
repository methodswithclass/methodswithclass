app.factory("notifications", function () {

	var pages = ["projectsBtn", "contactBtn"];

	var index;	

	var change = function (id) {

		console.log(id);

		for (i in pages) {

			if (id == pages[i]) {
				index = i;
			}
		}
	}

	var getPage = function () {

		return index;
	}

	return {

		change:change,
		getPage:getPage
	}

});