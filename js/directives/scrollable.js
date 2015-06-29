
app.directive("scrollable", ['global', '$window', 'notifications', function (global, $window, notifications) {

	var self = this;


	var startTop;
	var mouse = {};
	var vel = [];
	var vel0;
	var time = [];
	var offset;
	var top;
	var start;
	var velArray = [];

	var state = 0;

	this.isDown = false;
	this.enabled = [false, true];

	var mu = 0.3;

	var minVel = 0.1;

	this.scroll = {};
	var press;
	var ids = [];
	var element = {};
	var i = 0;
	var body;

	this.count = 0;

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

	var getDecellerate = function () {

		velArray = [];

		while (vel > minVel) {

			velArray[velArray.length] = vel;

			vel *= (1-mu);
		}
	}

	var getAbsoluteTop = function () {

		var el = getel();

		return el.offset().top - body.offset().top;
	}

	var getOffset = function () {

		offset = 1.1*mouse.y;
	}


	var getTop = function () {

		top = getAbsoluteTop();
	}

	var moveTop = function (increment) {

		top += increment;
	}

	var setTop = function (newTop) {

		var el = getel();

		el.css({'top': newTop + "px"});
	}

	var integrate = function (accel, interval) {

		var vel1 = vel0 + accel*interval
		top = top + vel1*interval;

		setTop(top);
	}

	var link = function ($scope, thing, attr) {

		ids = attr.ids.split(" ");

		for (i in ids) {

			console.log(ids[i]);
			element[ids[i]] = $("#" + ids[i]);
		}
		
		body = $("#" + $scope.body);

		console.log(body[0]);

		var bounce = function () {

			var el = getel();

			var top = el.offset().top;
			var bottom = top + el.height();

			var bodyTop = body.offset().top;
			var bodyBottom = bodyTop + body.height();

			//console.log("top:" + top + " bodyTop: " + bodyTop + " bottom: " + bottom + " bodyBottom: " + bodyBottom);
				
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

		var endMomentum = function () {

			var result = false;

			if (bounce() || vel < minVel) {
				result = true;
			}

			if (result) {
				//console.log("stop");
				clearInterval(timer);
				timer = null;
				start = getAbsoluteTop();
			}
		}

		var momentum = function (accel, interval) {

			vel0 = vel[1];

			timer = setInterval(function () {

				integrate(accel,interval);

				vel0 *= (1-mu);

				endMomentum();

			}, 10);

		}

		var down = function (e) {

			console.log(self.scroll[ids[i]]);
			//console.log("down");
			getMouse(e);
			start = getAbsoluteTop();
			getOffset();
			getTop();
			self.isDown = true;
		}

		var move = function (e) {

			//console.log(self.isDown);

			if (self.isDown) {
				getMouse(e);
				getVel(e, state);
				getOffset();
				setTop(offset + start);
				getTop();
			}
		}

		var up = function (e) {

			//console.log("end");
			isDown = false;
			momentum(vel[1] - vel[0], time[1] - time[0]);
		}

		var toggle = function (e) {

			if (e.center.x < body.width()/2) {
				console.log("toggle projects");
				$("#projects").addClass("z-20");
				$("#contacts").removeClass("z-20");
			}
			else {
				console.log("toggle contacts");
				$("#projects").removeClass("z-20");
				$("#contacts").addClass("z-20");
			}
		}

		var initPans = function () {

			for (i in ids) {

				var elem = element[ids[i]];

				//console.log(elem[0]);

				self.scroll[ids[i]] = new Hammer(elem[0]);

				self.scroll[ids[i]].get('pan').set({ direction: Hammer.DIRECTION_VERTICAL});
		        self.scroll[ids[i]].on('panstart', down);
		        self.scroll[ids[i]].on('pandown panup', move);
		        self.scroll[ids[i]].on('panend', up);

		    }
		}

		var initPress = function () {

			var press = new Hammer(body[0]);

			press.get('press').set({time:1, threshold:10});
			press.on("press", function (e) {

				toggle(e);
			});
		}

		initPans();

		initPress();

		notifications.register("test", function () {

			self.count++;

			console.log("inside " + self.count);
		});

		notifications.call("test");
		notifications.call("test");
		notifications.call("test");
		notifications.call("test");

		console.log("outside " + self.count);

		notifications.register("menu", function () {

			for (var i in self.enabled) {
				self.enabled[i] = !self.enabled[i];
				console.log(i + " " + self.enabled[i]);
				console.log(self.scroll[ids[i]]);
			}

			console.log("ids " + ids[0] + ids[1]);

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