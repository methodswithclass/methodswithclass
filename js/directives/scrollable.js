
app.directive("scrollable", ['global', '$swipe', function (global, $swipe) {

	var self = this;

	this.i = 0;
	this.start;
	this.startTop;
	this.mouse0;
	this.mouse;
	this.vel;
	this.pos;
	this.time0 = 0;
	this.time = 0;
	this.interval = 1;
	this.timer;

	this.mobile = true;

	this.isDown = false;

	this.mu = 0.1;

	this.minVel = 0.01;

	this.log = function (text) {

		console.log(text);

		$("#mConsole").text(text);
	}

	this.getProjectHeight = function (projects) {

		var sep = 0;

		for (i in projects) {

			sep += projects[i].mobileSep;
		}

		//console.log(sep);

		return projects.length*800 + sep;
	}

	this.getMouse = function (e, state) {

		if (state == -1) {
			self.start = {x:e.x, y:e.y};
		}
		else if (state == 0) {
			self.mouse0 = {x:e.x, y:e.y};
		}
		else if (state == 1){
			self.mouse = {x:e.x, y:e.y};
		}
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

	this.changePos = function (increment) {

		self.pos += increment;
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

	this.swapValues = function () {

		self.mouse0 = self.mouse;
		self.time0 = self.time;
	}

	this.setTop = function (el, top) {

		el.css({'top': top + "px"});
	}

	this.scroll = function (el, position) {

		var touch;

		if (position) {
			touch = position;
		}
		else {
			touch = self.pos;
		}

		self.setTop(el, touch + self.startTop);
	}

	

	this.bounce = function (el) {

		var top = el.offset().top;
		var bottom = top + el.height();

		var bodyTop = $(global.body).offset().top;
		var bodyBottom = bodyTop + $(global.body).height();

		console.log("top:" + top + " bodyTop: " + bodyTop + " bottom: " + bottom + " bodyBottom: " + bodyBottom);
			
		if (top > bodyTop) {
			console.log("below top");
			el.animate({top:0}, 100);
			return true;
		}
		else if (bottom < bodyBottom) {
			console.log("above bottom");
			el.animate({top:$(global.body).height() - el.height()}, 100);
			return true;
		}

		return false;
	}

	this.momentum = function (el) {

		self.timer = setInterval(function () {
			//console.log("interval");

			self.changePos(self.vel);

			self.setTop(el, self.pos);

			self.vel *= (1-self.mu);

			console.log("self.pos " + self.pos);

			if (self.bounce(el) || self.vel < self.minVel){
				console.log("stop");
				clearInterval(self.timer);
			}

		}, 50);

	}

	this.link = function (scope, element, attr) {

		var el = $("#" + scope.id);

		el.css({"height":self.getProjectHeight(scope) + "px"});

		var down = function (e) {

			self.startTop = el.offset().top - $("#" + attr.body).offset().top;
			self.getMouse(e, -1);
			self.getMouse(e, 0);
			self.getPos(0);
			//self.getTime(0);

			self.isDown = true;
		}

		var move = function (e) {

			e.preventDefault();

			if (self.isDown) {

				//self.getTime(1);
				//self.getInterval();
				self.getMouse(e, 1);
				self.getPos(1);
				self.getVel();
				self.scroll(el);
				self.swapValues();
			}
		}

		var up = function (e) {

			console.log("end");
			self.isDown = false;
			self.momentum(el);
			
		}

        $swipe.bind(el, {
          'start': down,
          'move': move,
          'end': up,
          'cancel': up
        });

	}

	return {
		scope:{
			projects:'=',
			id:'@'
		},
		link:self.link
	}
}]);