
app.directive("scrollable", ['global', function (global) {

	var self = this;

	this.i = 0;
	this.start;
	this.top;
	this.mouse0;
	this.mouse;
	this.vel;
	this.pos;
	this.time0;
	this.time;
	this.interval;
	this.timer;

	this.isDown = false;

	this.mu = 0.01;

	this.el = $(global.scrollContainer);

	this.log = function (text) {

		console.log(text);

		$("#mConsole").text(text);
	}

	this.getProjectHeight = function (scope) {

		var projects = scope.main.projects;

		var sep = 0;

		for (i in projects) {

			sep += projects[i].mobileSep;
		}

		//console.log(sep);

		return projects.length*800 + sep;
	}

	this.getMouse = function (e, state) {

		if (state == 0) {

			self.mouse0 = {x:e.pageX, y:e.pageY};
		}
		else {

			self.mouse = {x:e.pageX, y:e.pageY};
		}
	}

	this.swapMouse = function () {

		self.mouse0 = self.mouse;
	}

	this.startScroll = function (e) {

		self.top = $(global.body).offset().top - self.el.offset().top;

		//console.log(e);

		self.start = {x:e.pageX, y:e.pageY};

		self.getMouse(0);

	}

	this.getPos = function (state) {

		var touch;

		if (state == 0) {
			touch = self.mouse0;
		}
		else {

			touch = self.mouse;
		}

		self.pos = 1.1*(touch.y - self.start.y);

		return self.pos;
	}

	this.getVel = function () {

		self.vel = (self.getPos(self.mouse) - self.getPos(self.mouse0))/self.interval;
	}

	this.getTime = function (state) {

		if (state == 0) {
			self.time0 = (new Date()).getTime();
		}
		else if (state == 1) {
			self.time = (new Date()).getTime();
		}

		
	}

	this.getInterval = function () {

		if (self.time && self.time0) {

			self.interval = time - time0;
		}
	}

	this.scroll = function (position) {

		var touch;

		if (position) {
			touch = position;
		}
		else {
			touch = self.pos;
		}

		console.log("touch " + touch);


		self.el.css({'top': touch + self.top + "px"});
	}

	this.momentum = function (el) {

		self.timer = setInterval(function () {

			//console.log("momentum");

			scroll(self.vel*self.interval);

			self.vel *= (1-self.mu);

			if (self.vel < 0.01) {

				clearInterval(self.timer);
			}

		}, 10);
	}

	this.link = function (scope, element, attr) {

		var scroll = "";

		//$(global.body).css({"height":scope.main.pageHeight() + "px"});

		self.el.css({"height":self.getProjectHeight(scope) + "px"});

		//console.log(el.height());

		var down = function (e) {

			//alert("start");

			self.startScroll(e);
			self.getTime(0);

			self.isDown = true;
		}

		var move = function (e) {

			e.preventDefault();

			//scroll += " scroll";

			//log(scroll);

			if (self.isDown) {

				self.getTime(1);
				self.getInterval();
				self.getMouse(e, 1);
				console.log("mouse " + self.mouse.y);
				self.getPos(1);
				console.log("pos " + self.pos);
				self.getVel();
				console.log("vel " + self.vel);
				self.scroll();
				self.swapMouse();
			}
		}

		var up = function (e) {

			//alert("end");

			self.isDown = false;

			self.log("");

			self.getTime(1);
			self.getInterval();
			self.getMouse(e, 1);
			self.getPos(1);
			self.getVel();
			self.momentum();
			
		}

		self.el.on('touchstart', down);
		self.el.on('touchmove', move);
		self.el.on('touchend', up);

		self.el.on('mousedown', down);
		self.el.on('mousemove', move);
		self.el.on('mouseup', up);

	}

	return {
		
		link:self.link
	}
}]);