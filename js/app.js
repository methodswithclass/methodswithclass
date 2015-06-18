var app = angular.module("methodswithclass", ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.
      //Display desktop version
      when('/desktop', {
        //Template for Desktop based browsers
        templateUrl: 'views/desktop.html'
      }).
      //Display mobile version
      when('/mobile', {
        //Template for Mobile based browsers
        templateUrl: 'views/mobile.html'
      }).
      otherwise({redirectTo: '/desktop/homePage'});
});