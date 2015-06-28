
app.directive("scrollable", ['global', '$window', function (global, $window) {

	var self = this;


	var startTop;
	var mouse = {};
	var vel;
	var velArray = [];

	this.pos;
	this.isDown = false;

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

		vel = -1000*e.velocityY;

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

		startTop = el.offset().top - body.offset().top;
	}

	var getPos = function () {

		self.pos = 1.1*mouse.y;

		return self.pos;
	}

	var changePos = function (increment) {

		self.pos += increment;

		return self.pos;
	}

	var setTop = function (top) {

		el.css({'top': top + "px"});
	}

	var scroll = function (position) {

		setTop(position + startTop);
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

	var momentum = function (i) {

		console.log("vel " + vel);
		getDecellerate();

		timer = setInterval(function () {
			//console.log("interval");

			changePos(velArray[i++]);

			scroll(self.pos);

			if (bounce() || i == velArray.length - 1){
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
			getStart();
			getMouse(e);
			getPos();
			self.isDown = true;
		}

		var move = function (e) {

			console.log(self.isDown);

			if (self.isDown) {
				getMouse(e);
				getVel(e);
				scroll(getPos());
			}
		}

		var up = function (e) {

			console.log("end");
			isDown = false;
			momentum(0);
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