stateModule.provider("runtime.state", ["$stateProvider", function ($stateProvider) {
  // runtime dependencies for the service can be injected here, at the provider.$get() function.

    var provider = {};

    var states = [
    {
        name:"home",
        url:"/home",
        template:"<div class='relative width height' ng-include='getContentUrl()'></div>",
        controller:['$scope', 'data.service', function ($scope, data) {

            var shared = window.shared;
            var g = shared.utility_service;
            var send = shared.send_service;
            var react = shared.react_service;
            var events = shared.events_service;


            var self = this;

            self.blocks = data.blocks;

            $("#body").scrollTo(0);

            $scope.getContentUrl = function() {
                    
                var view;

                if (g.isMobile()) {
                    //console.log("load mobile home");
                    view = "m.home.html";
                }
                else {
                    //console.log("load desktop home");
                    view = "d.home.html";
                }

                return 'assets/views/' + view;
            }

            // refreshBackgrounds(".parallax");

        }],
        controllerAs:'main'
    },
    {
        name:"contact",
        url:"/contact",
        template:"<div class='relative width height' ng-include='getContentUrl()'></div>",
        controller:['$scope', '$stateParams', 'data.service', function ($scope, $stateParams, data) {


            var shared = window.shared;
            var g = shared.utility_service;
            var send = shared.send_service;
            var react = shared.react_service;
            var events = shared.events_service;


            $scope.contact = data.contact;

            $("#body").scrollTo(0);

            $scope.getContentUrl = function() {
            
                var view;

                if (g.isMobile()) {

                    view = "m.contact.html";
                }
                else {
                    view = "d.contact.html";
                }

                return 'assets/views/' + view;
            }

            $scope.email = function () {

                window.location.href = 'mailto:chris@methodswithclass.com';
            }

            $scope.resume = function () {

                window.location.href = 'assets/img/cpolito_201809.docx';
            }

        }]
    }
    ];

    var addState = function(state) { 

        console.log("add state " + state.name);

        $stateProvider.state(state);
    }

    provider.$get = ['data.service', function (data) {

      //console.log("get add state factory");

        var blogs = data.blogs;

        var service = function () {

            // console.log("create add state service");

            this.states = states;

            this.addState = addState;


        }

        return new service();
    
    }];

    provider.addState = addState;
    provider.states = states;

    return provider;
}]);