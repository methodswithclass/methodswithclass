var app = angular.module('methodswithclass', ['stateModule', 'uiModule', "ui.router"]);

app.config(['runtime.stateProvider', '$locationProvider', function (runtimeProvider, $locationProvider) {

	//console.log("config");

	$locationProvider.html5Mode(true);

	var states = runtimeProvider.states;

	for (var i = 0; i < states.length; i++) {
	  runtimeProvider.addState(states[i]);
	}

}]).run(["states", function (states) {

	states.go("home");

	// forceMobile();
}]);


getAngularModules(app);