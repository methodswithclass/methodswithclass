var app = angular.module('methodswithclass', ['sharedModule', 'consoleModule', 'stateModule', 'uiModule', "ngRoute", "ui.router"]);

app.config(['runtime.stateProvider', '$locationProvider', '$routeProvider', function (runtimeProvider, $locationProvider, $routeProvider) {

	//console.log("config");

	$locationProvider.html5Mode(true);

	var states = runtimeProvider.states;

	for (var i = 0; i < states.length; i++) {
	  runtimeProvider.addState(states[i]);
	}

}]).run(function (states) {

	states.go("home");

	//forceMobile();
});