
app.directive("scrollable", ['global', '$window', function (global, $window) {

	var self = this;

	var startTop;
	var mouse = {};
	
	this.pos;
	this.isDown = false;

	var mu = 0.1;

	var minVel = 0.01;

	var el;
	var body;

	var log = function (text) {

		console.log(text);

		$("#mConsole").text(text);
	}

	var getMouse = function (e, state) {
		mouse = {x:e.deltaX, y:e.deltaY};
	}

	var getPos = function () {

		self.pos = 1.1*mouse.y;

		return self.pos;
	}

	var changePos = function (increment) {

		self.pos += increment;
	}

	var setTop = function (top) {

		el.css({'top': top + "px"});
	}

	var scroll = function (position) {

		var touch;

		if (position) {
			touch = position;
		}
		else {
			touch = pos;
		}

		setTop(touch + startTop);
	}

	

	var bounce = function () {

		var top = el.offset().top;
		var bottom = top + el.height();

		var bodyTop = body.offset().top;
		var bodyBottom = bodyTop + body.height();

		console.log("top:" + top + " bodyTop: " + bodyTop + " bottom: " + bottom + " bodyBottom: " + bodyBottom);
			
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

	var momentum = function (e) {

		var vel = e.velocityY;

		timer = setInterval(function () {
			//console.log("interval");

			changePos(vel);

			setTop(self.pos);

			vel *= (1-mu);

			console.log("pos " + self.pos);

			if (bounce() || vel < minVel){
				console.log("stop");
				clearInterval(timer);
			}

		}, 10);

	}

	var link = function ($scope, element, attr) {

		el = $("#" + $scope.id);
		body = $("#" + attr.body);

		var down = function (e) {

			console.log("down");
			startTop = el.offset().top - body.offset().top;
			getMouse(e);
			getPos();
			self.isDown = true;
		}

		var move = function (e) {

			console.log(self.isDown);

			if (self.isDown) {
				getMouse(e);
				getPos();
				scroll();
			}
		}

		var up = function (e) {

			console.log("end");
			isDown = false;
			momentum(e);
		}

		var mc = new Hammer(el[0]);

		mc.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL});

        mc.on('press', down);
        mc.on('pandown panup', move);
        mc.on('panend', up);

        $scope.projectHeight = function (projects) {

			var sep = 0;

			for (i in projects) {

				sep += global.sep(projects[i]);
			}

			var result = projects.length*800 + sep;

			alert(result);

			return result;
		}

	}

	return {
		scope:{
			id:'@'
		},
		link:link
	}
}]);