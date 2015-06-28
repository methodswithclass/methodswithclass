
app.directive("scrollable", ['global', '$window', function (global, $window) {

	var self = this;


	var startTop;
	var mouse = {};
	var vel;
	var offset;
	var top;
	var start;
	var velArray = [];

	var isDown = false;

	var mu = 0.1;

	var minVel = 10;

	var el;
	var body;

	var log = function (text) {

		console.log(text);

		$("#mConsole").text(text);
	}

	var getMouse = function (e, state) {
		mouse = {x:e.deltaX, y:e.deltaY};
	}

	var getVel = function(e) {

		vel = -100*e.velocityY;

		//console.log(vel);
	}

	var getDecellerate = function () {

		velArray = [];

		while (vel > minVel) {

			velArray[velArray.length] = vel;

			vel *= (1-mu);
		}
	}

	var getStart = function () {

		start = el.offset().top - body.offset().top;

		return start;
	}

	var getOffsets = function () {

		offset = 1.1*mouse.y;

		top = offset + getStart();
	}

	var moveTop = function (increment) {

		top += increment;
	}

	var setTop = function (newTop) {

		el.css({'top': newTop + "px"});
	}

	var endMomentum = function () {

		if (bounce() || vel < minVel) {
			return true;
		}

		return false;
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

	var link = function ($scope, element, attr) {

		el = $("#" + $scope.id);
		body = $("#" + attr.body);

		var down = function (e) {

			console.log("down");
			getMouse(e);
			getOffsets();
			isDown = true;
		}

		var move = function (e) {

			console.log(isDown);

			if (isDown) {
				getMouse(e);
				getVel(e);
				getOffsets();
				setTop(offset + start);
			}
		}

		var up = function (e) {

			console.log("end");
			isDown = false;
			momentum();
		}

		var momentum = function () {

			console.log("vel " + vel);
			//getDecellerate();

			timer = setInterval(function () {
				//console.log("interval");

				moveTop(vel);

				vel *= (1-mu);

				setTop(top);

				if (endMomentum()){
					console.log("stop");
					clearInterval(timer);
				}

			}, 10);

		}

		var mc = new Hammer(el[0]);

		mc.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL});

        mc.on('panstart', down);
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