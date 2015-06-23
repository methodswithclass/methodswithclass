
app.directive("scrollable", ['global', '$swipe', function (global, $swipe) {

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

	this.mobile = true;

	this.isDown = false;

	this.mu = 0.1;

	this.minVel = 0.01;

	this.el = $(global.mProjects);

	this.log = function (text) {

		console.log(text);

		$("#mConsole").text(text);
	}

	this.check = function (e) {

		if (e.y) {

			return true;
		}
		
		return false;
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


		if (stat == -1) {
			if (self.mobile) self.start = {x:e.pageX, y:e.pageY};
			else self.start = {x:e.x, y:e.y};
		}
		else if (state == 0) {

			if (self.mobile) self.mouse0 = {x:e.pageX, y:e.pageY};
			else self.mouse0 = {x:e.x, y:e.y};
		}
		else if (state == 1){

			if (self.mobile) self.mouse = {x:e.pageX, y:e.pageY};
			else self.mouse = {x:e.x, y:e.y};
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

		//console.log(self.getPos(0) + " " + self.getPos(1) + " " + self.interval + " " + self.vel);
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

	this.setTop = function (top) {

		self.el.css({'top': top + "px"});
	}

	this.scroll = function (position) {

		var touch;

		if (position) {
			touch = position;
		}
		else {
			touch = self.pos;
		}

		self.setTop(touch + self.startTop);
	}

	this.changePos = function (increment) {

		self.pos += increment;
	}

	this.bounce = function () {

		var top = self.el.offset().top;
		var bottom = top + self.el.height();

		var bodyTop = $(global.body).offset().top;
		var bodyBottom = bodyTop + $(global.body).height();

		console.log("top:" + top + " bodyTop: " + bodyTop + " bottom: " + bottom + " bodyBottom: " + bodyBottom);
			
		if (top > bodyTop) {
			console.log("below top");
			self.el.animate({top:0}, 100);
			return true;
		}
		else if (bottom < bodyBottom) {
			console.log("above bottom");
			self.el.animate({top:$(global.body).height() - self.el.height()}, 100);
			return true;
		}

		return false;
	}

	this.momentum = function () {

		self.timer = setInterval(function () {
			//console.log("interval");

			self.changePos(self.vel);

			self.setTop(self.pos);

			self.vel *= (1-self.mu);

			console.log("self.pos " + self.pos);

			if (self.bounce() || self.vel < self.minVel){
				console.log("stop");
				clearInterval(self.timer);
			}

		}, 50);

	}

	this.link = function (scope, element, attr) {

		self.el.css({"height":self.getProjectHeight(scope) + "px"});

		var down = function (e) {

			self.mobile = self.check(e);

			self.startTop = self.el.offset().top - $(global.body).offset().top;
			self.getMouse(e, -1);
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

			self.momentum();
			
		}

		self.el.on('mousedown', down);
		self.el.on('mousemove', move);
		self.el.on('mouseup', up);
		self.el.on('mousecancel', up);

        $swipe.bind(self.el, {
          'start': down,
          'move': move,
          'end': up,
          'cancel': up
        });

	}

	return {
		restrict:'EA',
		link:self.link
	}
}]);