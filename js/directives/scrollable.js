
app.directive("scrollable", ['global', function (global) {

	var i = 0;
	var start;
	var top;
	var mouse0;
	var mouse;
	var vel0;
	var vel;
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

	var startScroll = function (el, e) {

		top = el.offset.top();

		alert(top);

		start = {x:e.pageX, y:e.pageY};

	}

	var getPos = function (touch) {

		return 1.1*(touch.y - start.y);
	}

	var getVel = function () {

		return (getPos(mouse) - getPos(mouse0))/interval;
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

	var scroll = function (el, pos) {

		el.css({'top': pos + top + 'px'});
	}

	var momentum = function () {

		var timer = setInterval(function () {

			console.log("momentum");

			scroll(vel0*interval);

			vel0 *= (1-mu);

			if (vel0 < 0.01) {

				clearInterval(timer);
			}

		}, 50);
	}

	var link = function (scope, element, attr) {

		$("#mPagesContainer").css({"height":scope.main.pageHeight() + "px"});

		$("#mProjectContainer").css({"height":getProjectHeight(scope) + "px"});

		var el = $(global.scrollContainer);

		el.on('touchstart', function (e) {

			//alert("start");

			start = startScroll(element, e);
			getTime(0);
		});

		el.on('touchmove', function (e) {

			getTime(1);
			getInterval();
			getMouse(e, 1);
			getVel();
			scroll();
		});

		el.on('touchend', function (e) {

			alert("end");

			getTime(1);
			getInterval();
			getMouse(e, 1);
			getVel();
			momentum();
			
		});

	}

	return {
		
		link:link
	}
}]);