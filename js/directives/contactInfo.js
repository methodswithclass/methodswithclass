app.directive("contactInfo", function () {
	return {

		restrict:'E',
		scope:{
			contact:'='
		},
		templateUrl:'/views/contacts.html'
	};

});