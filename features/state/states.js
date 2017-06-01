stateModule.factory("states", ['$q', 'runtime.state', '$state', '$rootScope', 'send', function ($q, runtime, $state, $rootScope, send) {

	var body = {};

	var prevState;

	var states = runtime.states;

	send.setup.receiver({name:"body", receiver:body});

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