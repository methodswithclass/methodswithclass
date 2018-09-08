stateModule.factory("states", ['$q', 'runtime.state', '$state', '$rootScope', function ($q, runtime, $state, $rootScope) {

	var shared = window.shared;
    var g = shared.utility_service;
    var send = shared.send_service;
    var react = shared.react_service;
    var events = shared.events_service;


	var body = {};

	var prevState;

	var states = runtime.states;

	send.back.setup({name:"body", receiver:body});

	var splitStateName = function (state) {

		var name = state.name.split(".");

		return {
			type:name[0],
			state:name[1]
		}

	}

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams) {

			//console.log(toState);	  

			prevState = fromState;

			console.log("to state", toState);
		}
	);

	$rootScope.$on('$stateChangeSuccess', 
		function(event, toState, toParams, fromState, fromParams) {

			console.log("state change end");	  

			// refreshBackgrounds(".parallax");
		}
	);

	var current = function () {

		return $state.current.name;
	}

	var go = function (state) {
		$state.go(state);
	}
	

	return {
		current:current,
		go:go
	}




}]);