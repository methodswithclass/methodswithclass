
app.directive("scrollable", function () {

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

	var getMouse = function (e) {

		return {x:e.pageX, y:e.pageY};
	}

	var getPos = function (touch) {

		return 1.1*(touch.y - start.y);
	}

	var getVel = function (touch, touch0) {

		return (getPos(touch) - getPos(touch0))/interval;
	}

	var getTime = function () {

		return (new Date()).getTime();
	}

	var scroll = function (el, pos) {

		el.css({'top': pos + top });
	}

	var momentum = function (vel0) {

		var timer = setInterval(function () {

			console.log("momentum");

			scroll(vel0*interval);

			vel0 *= (1-mu);

			if (vel0 < 0.01) {

				clearInterval(timer);
			}

		}, 50);
	}

	return {
		restrict:'A',
		link:function (scope, element, attr) {

			element.on('touchstart', function (e) {

				top = element.offset.top();
				start = getMouse(e);
				mouse0 = start;
				mouse = mouse0;
				time0 = getTime();
				time = time0;
			});

			element.on('touchmove', function (e) {

				time = getTime();
				interval = time - time0;
				mouse = getMouse(e);
				vel0 = getVel(mouse, mouse0);

				scroll(element, getPos(mouse));

				mouse0 = mouse;
				time0 = time;
			});

			element.on('touchend', function (e) {

				time = getTime();
				interval = time - time0;
				mouse = getMouse(e);
				vel0 = getVel(mouse, mouse0);

				alert(vel0);

				momentum(vel0);
				
			});

		}
	}
})