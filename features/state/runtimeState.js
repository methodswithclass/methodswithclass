stateModule.provider("runtime.state", function ($stateProvider) {
  // runtime dependencies for the service can be injected here, at the provider.$get() function.

    var provider = {};

    var states = [
    {
        name:"Default"
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