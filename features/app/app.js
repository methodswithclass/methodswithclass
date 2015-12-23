var app = angular.module('methodswithclass', ['sharedModule', 'consoleModule', 'stateModule', 'blogModule', "ngRoute", "ui.router"]);

app.config(['runtime.stateProvider', '$locationProvider', '$routeProvider', function (runtimeProvider, $locationProvider, $routeProvider) {

	//console.log("config");

	$locationProvider.html5Mode(true);

	var states = runtimeProvider.states;

	for (var i = 0; i < states.length; i++) {
	  runtimeProvider.addState(states[i]);
	}


    //$locationProvider.hashPrefix('!');

}]).run(["runtime.state", "$state", "$rootScope", function (runtime, $state, $rootScope) {

	runtime.checkInbound();

	//console.log("go to checking");

	//$state.go("checking");

	$rootScope.facebookAppId = '[696572137111194]';

}]);