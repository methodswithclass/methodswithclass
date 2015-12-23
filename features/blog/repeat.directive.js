blogModule.directive("repeat", ['$q', 'events', 'send', function ($q, events, send) {

	return function (scope, element, attr) {

		//console.log(attr.id);

		send.retrieve.accum({name:attr.dir, id:attr.id, data:element[0]});

		if (attr.dir == "blog") {

			if(scope.$last) {
				var wait = setTimeout(function () {
					events.future("loaded");
				}, 500);
			}
		}
	}
}]);