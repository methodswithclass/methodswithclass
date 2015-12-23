stateModule.provider("runtime.state", function ($stateProvider) {
  // runtime dependencies for the service can be injected here, at the provider.$get() function.

    var provider = {};

    var checkingController = function () {

        return ['validate.wrapper', 'con', 'events', '$document', '$location', '$stateParams', '$state', function (validate, con, events, $document, $location, $stateParams, $state) {

                events.on("console", function () {

                    //console.log("check console");

                    return con.isRegistered();
                });

                // console.log("check inbound");

                // var params = getParams($location.absUrl());

                // console.log("params: " + params);

                // var blog = "none";

                // if (params.blog) {

                //     if (data.resolveIndex(params.blog)) {

                //         blog = blogs[params.blog].meta_data.name;

                //     }
                //     else {
                //         blog = params.blog;
                //     }

                // }

                // send.setup.save({name:"inbound", data:blog});

                //$state.go("home");

                angular.element($document).ready(function () {

                    //console.log("document ready");

                    con.register($("#consoleContainer"));

                    con.attach();

                });

        }];

    }

    var blogController = function () {

        return ['$scope', 'global', '$stateParams', 'data.service', function ($scope, g, $stateParams, data) {

            console.log("name: " + $stateParams.name);

            $scope.blog = data.getBlogByName($stateParams.name);

            $scope.getContentUrl = function() {
            
                var view;

                if (g.isMobile()) {

                    view = "m.blog.html";
                }
                else {
                    view = "d.blog.html";
                }

                return 'features/views/' + view;
            }

            $scope.myModel = {
              Url: 'http://www.gentlephrasing.com/?b=' + $scope.blog.meta_data.name,
              Name: $scope.blog.content.title.text,
              ImageUrl: 'http://www.gentlephrasing.com/img/' + $scope.blog.meta_data.image + ".jpg"
            };
        

        }];
    }

    var states = [
    {
        name:"Default"
    },
    {
        name:"checking",
        url:"/checking",
        templateUrl:'features/views/g.checking.html',
        controller:checkingController()
    },
    {
        name:"Modal", 
        views:{
          "modal": {
            templateUrl: "features/views/modal/modal.html"
          }
        },
        onEnter: function() {
            
        onEnterModal();

        },
        onExit:function () {

        console.log("close modal");
        },
        abstract:true
    },
    {
        name:"Modal.valid",
        views:{
          "modal": {
            templateUrl: "features/views/modal/valid-modal.html"
          }
        }
    },
    {
        name:"Modal.invalid",
        views:{
            "modal": {
              templateUrl:"features/views/modal/invalid-modal.html"
            }
        }
    },
    {
        name:"home",
        url:"/home",
        template:"<div ng-include='getContentUrl()'></div>"
    },
    {
        name:"blog",
        url:"/blog/:name",
        template:"<div ng-include='getContentUrl()'></div>",
        controller:blogController()
    },
    {
        name:"credits",
        url:"/credits",
        templateUrl:'features/views/d.credits.html'
    }
    ];

    var addState = function(state) { 

        console.log("add state " + state.name);

        $stateProvider.state(state);
    }

    var printParams = function(params) {

        var string = "\n";

        for (i in params) {

            string += "parameter:" + i + " is:" + params[i] + "\n";
        }

        console.log(string);
    }

    var getParams = function (absurl) {

        var obj = {};

        var url = absurl.split("?");

        if (url.length > 1) {

            var pairs = url[1].split("&");

            var pairArray;

            for (i in pairs) {

                pairArray = pairs[i].split("=");

                obj[pairArray[0]] = pairArray[1];

            }

        }

        return obj;

    }

    var splitStateName = function (stateName) {

        var obj = {};

        var nameArray = stateName.split(".");

        if (nameArray.length > 0) {

            obj = {
                isChild:true,
                device:nameArray[0],
                state:nameArray[1]
            }

        }
        else {
            obj = {
                isChild:false,
                device:"none",
                state:stateName
            }
        }

        return obj;
    }

    provider.$get = ['send', '$location', 'data.service', 'global', '$state', function (send, $location, data, g, $state) {

      //console.log("get add state factory");

        var blogs = data.blogs;

        var service = function () {

            // console.log("create add state service");

            this.states = states;

            this.addState = addState;

            this.isState = function (name) {

                //var base = g.getBase();

                var stateObj;

                for (i in states) {

                    stateObj = splitStateName(states[i].name);  

                    if (name == stateObj.state) {
                      return true;
                    }
                }

                return false;
            }


            this.checkInbound = function() {

                console.log("check inbound");

                var params = getParams($location.absUrl());

                console.log(params);

                var blog = "none";

                if (params.b) {

                    // if (data.resolveIndex(params.blog)) {

                    //     blog = blogs[params.blog].meta_data.name;

                    // }
                    // else {
                        

                    blog = params.b;
                    

                }

                send.setup.save({name:"inbound", data:blog});

                $state.go("home");
            }


        }

        return new service();
    
    }];

    provider.addState = addState;
    provider.states = states;

    return provider;
});