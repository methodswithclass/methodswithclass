
app.directive("scrollable", ['global', function (global) {

	var i = 0;
	var start;
	var top;
	var mouse0;
	var mouse;
	var vel;
	var pos;
	var time0;
	var time;
	var interval;

	var mu = 0.01;

	var getProjectHeight = function (scope) {

		var projects = scope.main.projects;

		var sep = 0;

		for (i in projects) {

			sep += projects[i].mobileSep;
		}

		console.log(sep);

		return projects.length*800 + sep;
	}

	var getMouse = function (e, state) {

		if (state == 0) {

			mouse0 = {x:e.pageX, y:e.pageY};
		}
		else {

			mouse = {x:e.pageX, y:e.pageY};
		}
	}

	var swapMouse = function () {

		mouse0 = mouse;
	}

	var startScroll = function (el, e) {

		top = el.offset.top();

		start = {x:e.pageX, y:e.pageY};

		getMouse(0);

	}

	var getPos = function (state) {

		var touch;

		if (state == 0) {
			touch = mouse0;
		}
		else {

			touch = mouse;
		}

		pos = 1.1*(touch.y - start.y);
	}

	var getVel = function () {

		vel = (getPos(mouse) - getPos(mouse0))/interval;
	}

	var getTime = function (state) {

		if (state == 0) {
			time0 = (new Date()).getTime();
		}
		else if (state == 1) {
			time = (new Date()).getTime();
		}

		
	}

	var getInterval = function () {

		if (time && time0) {

			interval = time - time0;
		}
	}

	var scroll = function (el, position) {

		var touch;

		if (position) {
			touch = position;
		}
		else {
			touch = pos;
		}

		el.css({'top': touch + top + 'px'});
	}

	var momentum = function (el) {

		var timer = setInterval(function () {

			console.log("momentum");

			scroll(el, vel*interval);

			vel *= (1-mu);

			if (vel < 0.01) {

				clearInterval(timer);
			}

		}, 10);
	}

	var link = function (scope, element, attr) {

		var el = $(global.scrollContainer);

		$(global.body).css({"height":scope.main.pageHeight() + "px"});

		el.css({"height":getProjectHeight(scope) + "px"});

		console.log(el.height());

		el.on('touchstart', function (e) {

			//alert("start");

			start = startScroll(el, e);
			getTime(0);
		});

		el.on('touchmove', function (e) {

			getTime(1);
			getInterval();
			getMouse(e, 1);
			getPos(1);
			getVel();
			scroll(el);
			swapMouse();
		});

		el.on('touchend', function (e) {

			//alert("end");

			getTime(1);
			getInterval();
			getMouse(e, 1);
			getPos(1);
			getVel();
			momentum(el);
			
		});

	}

	return {
		
		link:link
	}
}]);