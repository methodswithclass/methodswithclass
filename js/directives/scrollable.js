
app.directive("scrollable", ['global', '$interval', 'notifications', 'con', function (global, $interval, notifications, con) {

	var self = this;


	var mouse = {};
	var vel = [];
	var vel0;
	var time = [];
	var offset;
	var top = {};
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

		if (typeof vel == Object && vel.hasOwnPropery("velocityY")) {
			velocity = Math.abs(100*vel.velocityY);
			console.log("velocity");
		}
		else {
			console.log("vel0");
			velocity = Math.abs(vel);
		}

		if (velocity < minVel) {
			console.log("is under min");
			return true;
		}
		
		return false;
	}

	var getAbsoluteTop = function () {

		var el = getel();

		return el.offset().top - body.offset().top;
	}

	var getOffset = function () {

		offset = 1.1*mouse.y;
	}

	var getTop = function () {

		console.log("get top");

		top[ids[i]] = getAbsoluteTop();
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

		start = getAbsoluteTop();
		getTop();
		vel[0] = 0;
		vel[1] = 0;
		time[0] = 0;
		time[1] = 0;
		vel0 = 0;
	}

	var bounce = function () {

		var el = getel();

		var elTop = el.offset().top;
		var bottom = elTop + el.height();

		var bodyTop = body.offset().top;
		var bodyBottom = bodyTop + body.height();
			
		if (elTop > bodyTop) {
			console.log("below top");
			el.animate({top:0}, 100, function () {
				getTop();
			});
			return true;
		}
		else if (bottom < bodyBottom) {
			console.log("above bottom");
			el.animate({top:body.height() - el.height()}, 100, function () {
				getTop();
			});
			return true;
		}

		return false;
	}

	var momentum = function (e, velDelta, interval) {

		vel0 = vel[1];

		self.timer = $interval(function () {

			integrate(velDelta/interval,interval);

			vel0 *= (1-mu);

			if (bounce()) {
				reset();
			}
			else if (isUnderVel(e) || isUnderVel(vel0)) {
				reset();
			}

		}, 10);

	}

	var down = function (e) {

		//console.log(self.scroll[ids[i]]);
		console.log("down");
		getMouse(e);
		start = getAbsoluteTop();
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

			con.log(elem[0]);

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