
app.directive("scrollable", ['global', '$swipe', function (global, $swipe) {

	var self = this;

	var i = 0;
	var start;
	var startTop;
	var mouse0;
	var mouse;
	var vel;
	var pos;
	var time0 = 0;
	var time = 0;
	var interval = 1;
	var timer;

	var isDown = false;

	var mu = 0.1;

	var minVel = 0.01;

	var el;

	var log = function (text) {

		console.log(text);

		$("#mConsole").text(text);
	}

	var getMouse = function (e, state) {

		if (state == -1) {
			start = {x:e.x, y:e.y};
		}
		else if (state == 0) {
			mouse0 = {x:e.x, y:e.y};
		}
		else if (state == 1){
			mouse = {x:e.x, y:e.y};
		}
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

		return pos;
	}

	var changePos = function (increment) {

		pos += increment;
	}

	var getVel = function () {

		vel = (getPos(1) - getPos(0));

		//console.log(getPos(0) + " " + getPos(1) + " " + interval + " " + vel);
	}

	var getTime = function (state) {

		if (state == 0) {
			time0 = (new Date()).getTime()/1000;
		}
		else if (state == 1) {
			time = (new Date()).getTime()/1000;
		}
	}

	var getInterval = function () {

		if (time && time0) {

			interval = time - time0;
		}
	}

	var swapValues = function () {

		mouse0 = mouse;
		time0 = time;
	}

	var setTop = function (el, top) {

		el.css({'top': top + "px"});
	}

	var scroll = function (el, position) {

		var touch;

		if (position) {
			touch = position;
		}
		else {
			touch = pos;
		}

		setTop(el, touch + startTop);
	}

	

	var bounce = function (el) {

		var top = el.offset().top;
		var bottom = top + el.height();

		var bodyTop = $(global.body).offset().top;
		var bodyBottom = bodyTop + $(global.body).height();

		console.log("top:" + top + " bodyTop: " + bodyTop + " bottom: " + bottom + " bodyBottom: " + bodyBottom);
			
		if (top > bodyTop) {
			console.log("below top");
			el.animate({top:0}, 100);
			return true;
		}
		else if (bottom < bodyBottom) {
			console.log("above bottom");
			el.animate({top:$(global.body).height() - el.height()}, 100);
			return true;
		}

		return false;
	}

	var momentum = function (el) {

		timer = setInterval(function () {
			//console.log("interval");

			changePos(vel);

			setTop(el, pos);

			vel *= (1-mu);

			console.log("pos " + pos);

			if (bounce(el) || vel < minVel){
				console.log("stop");
				clearInterval(timer);
			}

		}, 50);

	}

	var link = function ($scope, element, attr) {

		el = $("#" + $scope.id);

		var down = function (e) {

			startTop = el.offset().top - $("#" + attr.body).offset().top;
			getMouse(e, -1);
			getMouse(e, 0);
			getPos(0);
			//getTime(0);

			isDown = true;
		}

		var move = function (e) {

			e.preventDefault();

			if (isDown) {

				//getTime(1);
				//getInterval();
				getMouse(e, 1);
				getPos(1);
				getVel();
				scroll();
				swapValues();
			}
		}

		var up = function (e) {

			console.log("end");
			isDown = false;
			momentum();
			
		}

        $swipe.bind(el, {
          'start': down,
          'move': move,
          'end': up,
          'cancel': up
        });

	}

	$scope.projectsHeight = function (projects) {

		var sep = 0;

		for (i in projects) {

			sep += global.sep(projects[i]);
		}

		var result = projects.length*800 + sep;

		console.log(result);

		return result;
	}

	return {
		scope:{
			id:'@'
		},
		link:link
	}
}]);