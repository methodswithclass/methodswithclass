stateModule.provider("runtime.state", function ($stateProvider) {
  // runtime dependencies for the service can be injected here, at the provider.$get() function.

    var provider = {};

    var states = [
    {
        name:"home",
        url:"/home",
        template:"<div class='relative width height' ng-include='getContentUrl()'></div>",
        controller:['$scope', 'global', 'data.service', function ($scope, g, data) {

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
        controller:['$scope', 'global', '$stateParams', 'data.service', function ($scope, g, $stateParams, data) {

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

                window.location.href = 'img/cpolito_201610_folio.docx';
            }

        }]
    }
    ];

    var addState = function(state) { 

        console.log("add state " + state.name);

        $stateProvider.state(state);
    }

    provider.$get = ['send', '$location', 'data.service', 'global', '$state', function (send, $location, data, g, $state) {

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
});