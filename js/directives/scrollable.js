
app.directive("scrollable", ['global', function (global) {

	var self = this;

	this.i = 0;
	this.start;
	this.startTop;
	this.mouse0;
	this.mouse;
	this.vel;
	this.pos;
	this.time0;
	this.time;
	this.interval;
	this.timer;

	this.isDown = false;

	this.mu = 0.1;

	this.minVel = 0.01;

	this.el = $(global.mProjects);

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

	this.swapValues = function () {

		self.mouse0 = self.mouse;
		self.time0 = self.time;
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

		self.vel = (self.getPos(1) - self.getPos(0));

		console.log(self.getPos(0) + " " + self.getPos(1) + " " + self.interval + " " + self.vel);
	}

	this.getTime = function (state) {

		if (state == 0) {
			self.time0 = (new Date()).getTime()/1000;
		}
		else if (state == 1) {
			self.time = (new Date()).getTime()/1000;
		}
	}

	this.getInterval = function () {

		if (self.time && self.time0) {

			self.interval = self.time - self.time0;
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

		self.el.css({'top': touch + self.startTop + "px"});
	}

	this.bounce = function () {

		console.log("bounce");

		var top = self.el.offset().top;
		var bottom = top + self.el.height();

		var bodyTop = $(global.body).offset().top
		var bodyBottom = bodyTop + self.el.height()
			
		if (top > bodyTop) {
			self.el.animate({top:0}, 100);
			return true;
		}
		else if (bottom < bodyBottom) {
			self.el.animate({top:$(global.body).height() - self.el.height()}, 100);
			return true;
		}

		return false;
	}

	this.momentum = function (vel) {

		console.log("vel " + vel);

		scroll(vel);

		return vel;

	}

	this.link = function (scope, element, attr) {

		self.el.css({"height":self.getProjectHeight(scope) + "px"});

		var down = function (e) {

			self.startTop = self.el.offset().top - $(global.body).offset().top;
			self.start = {x:e.pageX, y:e.pageY};
			self.getMouse(e, 0);
			self.getPos(0);
			self.getTime(0);

			self.isDown = true;
		}

		var move = function (e) {

			e.preventDefault();

			if (self.isDown) {

				//console.log(self.startTop);

				self.getTime(1);
				self.getInterval();
				self.getMouse(e, 1);
				//console.log("mouse " + self.mouse.y);
				self.getPos(1);
				//console.log("pos " + self.pos);
				self.getVel();
				//console.log("vel " + self.vel);
				self.scroll();
				self.swapValues();
			}
		}

		var up = function (e) {

			console.log("end");

			self.isDown = false;

			// if (!self.bounce()) {
			// 	console.log("not bounce");
			// 	self.timer = setInterval(function () {
			// 		console.log("interval");
			// 		self.vel = self.momentum(self.vel);

			// 		if (self.vel < self.minVel){
			// 			console.log("stop");
			// 			clearInterval(self.timer);
			// 		}

			// 	}, 1000);
			// }
			
		}

		self.el.on('touchstart', down);
		self.el.on('touchmove', move);
		self.el.on('touchend', up);

		self.el.on('mousedown', down);
		self.el.on('mousemove', move);
		self.el.on('mouseup', up);
		self.el.on('mousecancel', up);

	}

	return {
		
		link:self.link
	}
}]);