
app.directive("scrollable", ['global', '$window', function (global, $window) {

	var self = this;

	var i = 0;
	var start = {};
	var startTop;
	var mouse0 = {};
	var mouse = {};
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
	var body;

	var log = function (text) {

		console.log(text);

		$("#mConsole").text(text);
	}

	var getMouse = function (e, state) {
		mouse = {x:e.deltaX, y:e.deltaY};
	}

	var getPos = function () {

		pos = 1.1*mouse.y;

		return pos;
	}

	var changePos = function (increment) {

		pos += increment;
	}

	var swapValues = function () {

		mouse0 = mouse;
		time0 = time;
	}

	var setTop = function (top) {

		el.css({'top': top + "px"});
	}

	var scroll = function (position) {

		var touch;

		if (position) {
			touch = position;
		}
		else {
			touch = pos;
		}

		setTop(touch + startTop);
	}

	

	var bounce = function () {

		var top = el.offset().top;
		var bottom = top + el.height();

		var bodyTop = body.offset().top;
		var bodyBottom = bodyTop + body.height();

		console.log("top:" + top + " bodyTop: " + bodyTop + " bottom: " + bottom + " bodyBottom: " + bodyBottom);
			
		if (top > bodyTop) {
			console.log("below top");
			el.animate({top:0}, 100);
			return true;
		}
		else if (bottom < bodyBottom) {
			console.log("above bottom");
			el.animate({top:body.height() - el.height()}, 100);
			return true;
		}

		return false;
	}

	var momentum = function (e) {

		var vel = e.velocityY;

		timer = setInterval(function () {
			//console.log("interval");

			changePos(vel);

			setTop(pos);

			vel *= (1-mu);

			console.log("pos " + pos);

			if (bounce() || vel < minVel){
				console.log("stop");
				clearInterval(timer);
			}

		}, 10);

	}

	var link = function ($scope, element, attr) {

		el = $("#" + $scope.id);
		body = $("#" + attr.body);

		var down = function (e) {

			console.log("down");
			startTop = el.offset().top - body.offset().top;
			isDown = true;
		}

		var move = function (e) {

			console.log(isDown);

			if (isDown) {
				getMouse(e);
				getPos();
				scroll();
			}
		}

		var up = function (e) {

			console.log("end");
			isDown = false;
			momentum();
		}

		var mc = new Hammer(el[0]);

		mc.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL});

        mc.on('press', down);
        mc.on('pandown panup', move);
        mc.on('panend', up);

        $scope.projectHeight = function (projects) {

			var sep = 0;

			for (i in projects) {

				sep += global.sep(projects[i]);
			}

			var result = projects.length*800 + sep;

			alert(result);

			return result;
		}

	}

	return {
		scope:{
			id:'@'
		},
		link:link
	}
}]);