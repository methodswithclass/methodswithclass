
app.directive("scrollable", ['global', '$interval', 'events', 'con', function (global, $interval, events, con) {

	var self = this;


	var mouse = {};
	var offset;
	var top = {};
	var bottom = {};
	var start = {};
	this.timer;


	this.vel = [];
	this.accel = 0;
	this.vel0 = 0;
	this.vel1 = 0;
	this.pos0 = 0;
	this.pos = {};

	this.interval = 1;

	var state = 0;

	this.isDown = false;
	this.enabled = [false, true];

	var mu = -0.1;

	var minVel = 0.01;

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

	var getVel = function (e) {

		return -e.velocityY;
	}

	var getMouse = function (e) {

		return {x:e.deltaX, y:e.deltaY};
	}

	var getAccel = function (e) {

		self.interval = e.deltaTime;

		var accel = (self.vel[self.vel.length] - self.vel[0])/self.interval;

		return accel;
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

	var getTop = function () {

		console.log("get top");

		var rect = getAbsoluteRect();

		top[ids[i]] = rect.top;
		bottom[ids[i]] = rect.bottom; 
	}

	var setTop = function (newTop) {

		self.pos[ids[i]] = newTop;

		var el = getel();

		el.css({'top': newTop + "px"});
	}

	var startIntegration = function () {

		self.running = true;
	}

	var stopIntegration = function () {

		self.running = false;
	}

	var reset = function () {

		console.log("reset");

		stopIntegration();

		this.vel = [];
		this.accel = 0;
		this.vel0 = 0;
		this.vel1 = 0;
		this.pos0 = 0;
		this.interval = 1;

		self.vel = [];
		self.vel0 = 0;
		start[ids[i]] = pos[ids[i]];
		getTop();
	}

	var friction = function () {

		self.vel0 *= mu;
	}

	var bounce = function () {

		

		var el = getel();

		var rect = getAbsoluteRect();

		var bottomBounce = body.height() - el.height()
			
		if (rect.absTop > bodyTop) {
			console.log("below top");
			el.animate({top:0}, 100, function () {
				//setTop(0);
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

	var integrate = function () {

		console.log("integrate");

		self.vel1 = self.vel0 + self.accel*self.interval
		self.pos[ids[i]] = self.pos0 + self.vel1*self.interval;

		//console.log("pos " + self.pos1 + " vel " + self.vel1 + " time " + self.interval);

		setTop(self.pos[ids[i]]);

		self.pos0 = self.pos[ids[i]];
		self.vel0 = self.vel1;
	}

	var repeat = function () {

		//console.log(self.running);

		if (self.running) {

			integrate();

			friction();

			bounce();

		}
	}

	var motion = function () {

		self.timer = $interval(repeat, 10);
	}

	var down = function (e) {

		console.log("down");
		stopIntegration();
		self.isDown = true;
		self.vel = null;
		self.vel = [];
		self.vel[0] = getVel(e);
		self.vel0  = self.vel[0];
		start[ids[i]] = self.pos[ids[i]];
	}

	var move = function (e) {

		if (self.isDown) {	

			//console.log("move");

			stopIntegration();
			self.accel = 0;
			self.vel[self.vel.length] = getVel(e);

			setTop(getMouse(e).y + start[ids[i]]);

		}
	}

	var up = function (e) {

		console.log("end");
		isDown = false;
		self.pos0 = self.pos[ids[i]];
		self.accel = getAccel(e);
		startIntegration();
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

		body = $("#" + $scope.body);

		bodyTop = body.offset().top;
		bodyBottom = bodyTop + body.height();

		ids = attr.ids.split(" ");

		for (i in ids) {

			console.log(ids[i]);
			element[ids[i]] = $("#" + ids[i]);
			pos[ids[i]] = element[ids[i]].offset().top - bodyTop;
		}

		initPans();

		motion();

		stopIntegration();

		events.on("menu", function () {

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

		events.dispatch("menu");

	}

	return {
		scope:{
			body:'@'
		},
		link:link
	}
}]);