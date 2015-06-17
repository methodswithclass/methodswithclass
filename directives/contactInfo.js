app.directive("contactInfo", function () {
	return {

		restrict:'E',
		scope:{
			pageInfo:'='
		},
		templateUrl:'views/projects.html'
	};

});