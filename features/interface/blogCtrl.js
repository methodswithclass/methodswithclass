blogModule.controller("blogCtrl", ['$scope', 'data.service', 'runtime.state', 'states', '$window', 'events', '$location', 'global', 'send', function ($scope, data, runtime, states, $window, events, $location, g, send) {

	console.log("enter controller");

	var self = this;

	this.blogs = data.blogs;
	this.home = data.home;
	this.title = data.home.meta_data.title;

	//states.setupReceivers();

	var blog = send.retrieve.get({name:"inbound"})[0];

	console.log(blog);

	if (data.isBlog(blog)) {
		console.log("controller inbound " + blog);

		states.go(blog);
	}
	else {

		console.log("no blog");

		//states.go("home");
	}

	//events.runTrigger("states", "loaded");

	$scope.openExternal = function (link) {

		$window.open(link, "_blank");
	}

	$scope.getContentUrl = function() {
			
		var view;

		if (g.isMobile()) {
			console.log("load mobile home");
			view = "m.home.html";
		}
		else {
			console.log("load desktop home");
			view = "d.home.html";
		}

        return 'features/views/' + view;
    }

    

    $window.asyncFBInit = function (test) {

    	console.log("facebook sdk loaded");

    	var prod = '696572137111194';
    	var dev = '725062234262184';

        FB.init({
          appId: test ? dev : prod,
          status: true, 
          cookie: true, 
          xfbml: true,
          version: 'v2.4'
        });
    }

}]);