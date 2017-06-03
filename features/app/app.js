<<<<<<< HEAD
var app = angular.module('methodswithclass', ['sharedModule', 'consoleModule', 'stateModule', 'uiModule', "ui.router"]);

app.config(['runtime.stateProvider', '$locationProvider', function (runtimeProvider, $locationProvider) {
=======
var app = angular.module('methodswithclass', ['sharedModule', 'consoleModule', 'stateModule', 'uiModule', "ngRoute", "ui.router"]);

app.config(['runtime.stateProvider', '$locationProvider', '$routeProvider', function (runtimeProvider, $locationProvider, $routeProvider) {
>>>>>>> 38d6b12f3c7c63afd1a9a0b2c39c3720401601ac

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