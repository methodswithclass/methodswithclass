app.directive("contactInfo", function () {
	return {

		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:'/views/contacts.html'
	};

});