
app.directive("scrollable", ['global', '$interval', 'events', 'con', function (global, $interval, events, con) {

	var self = this;


	var mouse = {};
	var offset;
	var top = {};
	var bottom = {};
	var start = {};
	this.timer;


	this.vel = 0;
	this.pos0 = 0;
	this.pos = {};

	this.interval = 1;

	var state = 0;

	this.isDown = false;
	this.isFirst = false;
	this.enabled = [false, true];

	var mu = -0.1;

	var minVel = 0.1;

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
		var elHeight = el.height();

		return {
			atop:elTop,
			rtop:elTop - bodyTop,
			height:elHeight,
			bottom:elTop + elHeight
		}
	}

	var getTop = function () {

		console.log("get top");

		var rect = getAbsoluteRect();

		top[ids[i]] = rect.rtop;
		bottom[ids[i]] = rect.bottom; 
	}

	var setPos = function (newTop) {

		self.pos[ids[i]] = newTop;

		setTop(newTop);
	}

	var setTop = function (newTop) {

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

		this.vel = 0;
		this.pos0 = 0;
		this.interval = 1;

		start[ids[i]] = pos[ids[i]];
		getTop();
	}

	var friction = function () {

		self.vel *= mu;

		console.log(self.vel);

		if (isUnderVel(self.vel)) {
			bounce();
		}
	}

	var bounce = function () {

		stopIntegration();

		var el = getel();

		var rect = getAbsoluteRect();

		var bottomBounce = body.height() - el.height()
			
		if (rect.atop > bodyTop) {
			console.log("below top");
			el.animate({top:0}, 100, function () {
				setPos(0);
				reset();
			});
		}
		else if (bottom[ids[i]] < bodyBottom) {
			console.log("above bottom");
			el.animate({top:bottomBounce}, 100, function () {
				setPos(bottomBounce);
				reset();
			});
		}
		else {
			reset();
		}
	}

	var integrate = function () {

		console.log("running");

		self.pos[ids[i]] = self.pos0 + self.vel*self.interval;

		setTop(self.pos[ids[i]]);

		self.pos0 = self.pos[ids[i]];
	}

	var motion = function () {

		self.timer = $interval(function () {

			if (self.running) {

				integrate();

				friction();

			}
		}, self.interval/1000);
	}

	var down = function (e) {

		console.log("down");
		stopIntegration();
		self.isDown = true;
		start[ids[i]] = self.pos[ids[i]];
	}

	var move = function (e) {

		if (self.isDown) {	

			//console.log("move");

			stopIntegration();
			self.accel = 0;
			self.vel = getVel(e);
			getTop();
			self.pos[ids[i]] = getMouse(e).y + start[ids[i]];

			setTop(self.pos[ids[i]]);

		}
	}

	var up = function (e) {

		console.log("end");
		isDown = false;
		self.pos0 = self.pos[ids[i]];
		self.interval = e.deltaTime;
		console.log("interval " + self.interval);
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