
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

	this.mu = 0.01;

	this.log = function (text) {

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

	this.startScroll = function (el, e) {

		self.top = el.offset.top();

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

		self.vel = (getPos(mouse) - getPos(mouse0))/self.interval;
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

	this.scroll = function (el, position) {

		log("scroll");

		var touch;

		if (position) {
			touch = position;
		}
		else {
			touch = self.pos;
		}


		el.css({'top': touch + self.top + 'px'});
	}

	this.momentum = function (el) {

		self.timer = setInterval(function () {

			//console.log("momentum");

			scroll(el, self.vel*self.interval);

			self.vel *= (1-self.mu);

			if (self.vel < 0.01) {

				clearInterval(self.timer);
			}

		}, 10);
	}

	this.link = function (scope, element, attr) {

		var scroll = "";

		var el = $(global.scrollContainer);

		//$(global.body).css({"height":scope.main.pageHeight() + "px"});

		el.css({"height":self.getProjectHeight(scope) + "px"});

		//console.log(el.height());

		var down = function (e) {

			//alert("start");

			self.start = self.startScroll(el, e);
			self.getTime(0);
		}

		var move = function (e) {

			//scroll += " scroll";

			//log(scroll);

			self.getTime(1);
			self.getInterval();
			self.getMouse(e, 1);
			self.getPos(1);
			self.getVel();
			self.scroll(el);
			self.swapMouse();
		}

		var up = function (e) {

			//alert("end");

			self.log("");

			self.getTime(1);
			self.getInterval();
			self.getMouse(e, 1);
			self.getPos(1);
			self.getVel();
			self.momentum(el);
			
		}

		el.on('touchstart', down);
		el.on('touchmove', move);
		el.on('touchend', up);

		el.on('mousedown', down);
		el.on('mousemove', move);
		el.on('mouseup', up);

	}

	return {
		
		link:self.link
	}
}]);