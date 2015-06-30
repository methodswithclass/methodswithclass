
app.directive("scrollable", ['global', '$interval', 'notifications', 'con', function (global, $interval, notifications, con) {

	var self = this;


	var mouse = {};
	var vel = [];
	var vel0;
	var time = [];
	var offset;
	var top = {};
	var bottom = {};
	var start;
	this.timer;

	var state = 0;

	this.isDown = false;
	this.enabled = [false, true];

	var mu = 0.4;

	var minVel = 0.001;

	this.scroll = {};
	var ids = [];
	var element = {};
	var i = 1;
	var body;
	var bodyTop;
	var bodyBottom;

	var getel = function () {

		return element[ids[i]];
	}

	var getMouse = function (e, state) {
		mouse = {x:e.deltaX, y:e.deltaY};
	}

	var getVel = function(e, state) {

		vel[state] = -100*e.velocityY;
		time[state] = e.deltaTime;

		state = state == 0 ? 1 : 0;
	}

	var isUnderVel = function (vel) {

		var velocity;

		if (Object.prototype.toString.call(vel) == '[object Object]' && vel.hasOwnProperty("velocityY")) {
			velocity = Math.abs(100*vel.velocityY);
		}
		else {
			velocity = Math.abs(vel);
		}

		if (velocity < minVel) {
			return true;
		}
		
		return false;
	}

	var getAbsoluteRect = function () {

		var el = getel();

		var elTop = el.offset().top - body.offset().top;
		var elBottom = elTop + el.height();

		return {
			top:elTop,
			bottom:elBottom
		}
	}

	var getOffset = function () {

		offset = 1.1*mouse.y;
	}

	var getTop = function () {

		console.log("get top");

		var rect = getAbsoluteRect();

		top[ids[i]] = rect.top;
		bottom[ids[i]] = rect.bottom; 
	}

	var setTop = function (newTop) {

		var el = getel();

		el.css({'top': newTop + "px"});
	}

	var integrate = function (accel, interval) {

		var vel1 = vel0 + accel*interval
		top[ids[i]] = top[ids[i]] + vel1*interval;

		setTop(top[ids[i]]);
	}

	var reset = function () {

		console.log("reset");

		$interval.cancel(self.timer);

		start = getAbsoluteRect().top;
		getTop();
		vel[0] = 0;
		vel[1] = 0;
		time[0] = 0;
		time[1] = 0;
		vel0 = 0;

		bounce();
	}

	var bounce = function () {

		var el = getel();
			
		if (top[ids[i]] > bodyTop) {
			el.animate({top:0}, 100, function () {
				reset();
			});
		}
		else if (bottom[ids[i]] < bodyBottom) {
			el.animate({top:body.height() - el.height()}, 100, function () {
				reset();
			});
		}
	}

	var momentum = function (e, velDelta, interval) {

		vel0 = vel[1];

		self.timer = $interval(function () {

			integrate(velDelta/interval,interval);

			vel0 *= (1-mu);

			if (isUnderVel(e)) {
				console.log("under velocity");
				reset();
			}
			else if (isUnderVel(vel0)) {
				console.log("under vel0");
				reset();
			}

		}, 10);

	}

	var down = function (e) {

		//console.log(self.scroll[ids[i]]);
		console.log("down");
		getMouse(e);
		start = getAbsoluteRect().top;
		getOffset();
		getTop();
		self.isDown = true;
	}

	var move = function (e) {

		console.log("move");

		if (self.isDown) {
			getMouse(e);
			getVel(e, state);
			getOffset();
			setTop(offset + start);
			getTop();
		}
	}

	var up = function (e) {

		console.log("end");
		isDown = false;
		momentum(e, vel[1] - vel[0], time[1] - time[0]);
	}

	var initPans = function () {

		for (i in ids) {

			var elem = element[ids[i]];

			self.scroll[ids[i]] = new Hammer(elem[0]);

			self.scroll[ids[i]].get('pan').set({ direction: Hammer.DIRECTION_VERTICAL});
	        self.scroll[ids[i]].on('panstart', down);
	        self.scroll[ids[i]].on('pandown panup', move);
	        self.scroll[ids[i]].on('panend', up);

	    }
	}

	var link = function ($scope, thing, attr) {

		ids = attr.ids.split(" ");

		for (i in ids) {

			console.log(ids[i]);
			element[ids[i]] = $("#" + ids[i]);
		}
		
		body = $("#" + $scope.body);

		bodyTop = body.offset().top;
		bodyBottom = bodyTop + body.height();



		//console.log(body[0]);

		initPans();

		notifications.register("menu", function () {

			for (var j in self.enabled) {
				self.enabled[j] = !self.enabled[j];

				if (self.enabled[j]) {
					i = j;
				}
			}

			console.log("enabled " + i);

			self.scroll[ids[0]].set({enable:self.enabled[0]});
			self.scroll[ids[1]].set({enable:self.enabled[1]});

		});

		notifications.call("menu");

	}

	return {
		scope:{
			body:'@'
		},
		link:link
	}
}]);