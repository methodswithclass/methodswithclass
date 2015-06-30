
app.directive("scrollable", ['global', '$interval', 'notifications', 'con', function (global, $interval, notifications, con) {

	var self = this;


	var mouse = {};
	var vel = [];
	var vel0;
	var time = [];
	var offset;
	var top = {};
	var bottom = {};
	var start = {};
	this.timer;

	var state = 0;

	this.isDown = false;
	this.enabled = [false, true];

	var mu = -0.0001;

	var minVel = 1e-8;

	this.scroll = {};
	var ids = [];
	var element = {};
	var i = 1;
	var body;
	var bodyTop;
	var bodyBottom;

	this.running = false;

	var getel = function () {

		return element[ids[i]];
	}

	var getMouse = function (e, state) {
		mouse = {x:e.deltaX, y:e.deltaY};
	}

	var getVel = function(e, state) {

		vel[state] = -1000*e.velocityY;
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

		var elTop = el.offset().top;
		var elBottom = elTop + el.height();

		return {
			absTop:elTop,
			top:elTop - bodyTop,
			bottom:elBottom
		}
	}

	var getOffset = function () {

		offset = mouse.y;
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

		var vel1 = vel0 + Math.abs(vel0)/vel0*Math.abs(accel)*interval
		top[ids[i]] = top[ids[i]] + vel1*interval;

		setTop(top[ids[i]]);
	}

	var reset = function () {

		console.log("reset");

		vel[0] = 0;
		vel[1] = 0;
		time[0] = 0;
		time[1] = 0;
		vel0 = 0;
		start[ids[i]] = getAbsoluteRect().top;
		getTop();
	}

	var bounce = function () {

		self.running = false;

		var el = getel();

		var rect = getAbsoluteRect();

		var bottomBounce = body.height() - el.height()
			
		if (rect.absTop > bodyTop) {
			console.log("below top");
			el.animate({top:0}, 100, function () {
				setTop(0);
				reset();
			});
		}
		else if (bottom[ids[i]] < bodyBottom) {
			console.log("above bottom");
			el.animate({top:bottomBounce}, 100, function () {
				setTop(bottomBounce);
				reset();
			});
		}
		else {
			reset();
		}
	}

	var momentum = function (e, velDelta, interval) {

		vel0 = vel[1];

		self.timer = $interval(function () {

			if (self.running) {

				integrate(velDelta/interval,interval);

				vel0 *= mu;

				if (isUnderVel(vel0)) {
					console.log("under vel0");
					bounce();
				}
				else if (isUnderVel(e)) {
					console.log("under velocity");
					bounce();
				}
			}
		}, 500);

	}

	var down = function (e) {

		console.log("down");

		self.running = false;
		reset();
		getMouse(e);
		getOffset();
		self.isDown = true;
	}

	var move = function (e) {

		//console.log("move");

		if (self.isDown) {
			getMouse(e);
			getVel(e, state);
			getOffset();
			setTop(offset + start[ids[i]]);
			getTop();
		}
	}

	var up = function (e) {

		console.log("end");
		isDown = false;
		self.running = true;
		momentum(e, vel[1] - vel[0], time[1] - time[0]);
	}

	var initPans = function () {

		for (var j in ids) {

			var elem = element[ids[j]];

			self.scroll[ids[j]] = new Hammer(elem[0]);

			self.scroll[ids[j]].get('pan').set({ direction: Hammer.DIRECTION_VERTICAL});
	        self.scroll[ids[j]].on('panstart', down);
	        self.scroll[ids[j]].on('pandown panup', move);
	        self.scroll[ids[j]].on('panend', up);

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

		//alert(bodyTop);
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