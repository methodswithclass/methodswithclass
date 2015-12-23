blogModule.directive("body", ['send', function (send) {

	return function ($scope, element, attr) {

		if (attr.dir == "body")	send.retrieve.accum({name:attr.dir, id:"body", data:element[0]});
	}

}]);