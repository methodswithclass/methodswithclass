uiModule.directive("body", [function () {


	var shared = window.shared;
    var g = shared.utility_service;
    var send = shared.send_service;
    var react = shared.react_service;
    var events = shared.events_service;



	return function ($scope, element, attr) {

		send.back.add({name:"body", id:"body", data:element[0]});
	}

}]);