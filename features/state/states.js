stateModule.factory("states", ['$q', 'runtime.state', '$state', '$rootScope', 'data.service', 'send', 'events', 'global', 'parallax.service', '$location', function ($q, runtime, $state, $rootScope, data, send, events, g, parallax, $location) {

	var modalTime = 1000;

	var body = {};
	var elements = {};
	var bodyElem;
	var elem;
	var btn;

	var prevState;

	var states = runtime.states;

	var state;

	var blogs = data.blogs;

	send.setup.receiver({name:"body", receiver:body});

	send.setup.receiver({name:"blog", receiver:elements});

	var setModalTime = function (_time) {

		modalTime = _time;
	}

	var getModalTime = function () {

		return modalTime;
	}

	var splitStateName = function (state) {

		var name = state.name.split(".");

		return {
			type:name[0],
			state:name[1]
		}

	}

	var onEnterModal = function () {

		var prevName = prevState.name;

    	if (prevName == "" || splitStateName(prevName).type == "Modal") {
    		prevName = states[0].name;
    	}

		var close = function () {

			$state.go(prevName);	
		}

		var timer = setTimeout(function () {
		  close();
		}, getModalTime());
	}

	$rootScope.$on('$stateChangeStart', 
		function(event, toState, toParams, fromState, fromParams) {

			//console.log(toState);	  

			prevState = fromState;

			console.log(toState);
		}
	);

	var addState = function (name) {

		state = {

			name:"blog." + name,
			url:"/" + name

		};

		states.push(state);

		runtime.addState(state);
	}

	var define = function () {

		var blog = send.retrieve.get({name:"inbound"});

		if (runtime.isState(blog)) {
			//console.log("return blog is " + blog);
			return resolve(blog);
		}
		else {
			return reject(false);
		}

	}

	var showModal = function (params) {

		//console.log("show modal " + params.modal);

		setModalTime(params.time);

		$state.go("Modal." + params.modal);
	}

	var go = function (state) {

		if (data.isBlog(state)) {
			console.log("state " + state);
			$state.go("blog", {name:state});
		}
		else{
			$state.go(state);
		}
	}
	

	return {
		define:define,
		showModal:showModal,
		go:go
	}




}]);