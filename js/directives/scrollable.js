
app.directive("scrollable", ['global', '$window', function (global, $window) {

	var self = this;


	var startTop;
	var mouse = {};
	var vel;
	var offset;
	var top;
	var start;
	var velArray = [];

	var isDown = false;

	var mu = 0.1;

	var minVel = 10;

	var scroll = {};
	var press;
	var ids = [];
	var element = {};
	var i = 0;
	var body;

	var getel = function () {

		return element[ids[i]];
	}

	var log = function (text) {

		console.log(text);

		$("#mConsole").text(text);
	}

	var getMouse = function (e, state) {
		mouse = {x:e.deltaX, y:e.deltaY};
	}

	var getVel = function(e) {

		vel = -100*e.velocityY;

		//console.log(vel);
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

		var endMomentum = function () {

			var result = false;

			if (bounce() || vel < minVel) {
				result = true;
			}

			if (result) {
				console.log("stop");
				clearInterval(timer);
				timer = null;
			}
		}

		var momentum = function () {

			timer = setInterval(function () {

				moveTop(vel);
				vel *= (1-mu);
				setTop(top);
				endMomentum();

			}, 10);

		}

		var down = function (e) {

			console.log("down");
			getMouse(e);
			start = getAbsoluteTop();
			getOffset();
			getTop();
			isDown = true;
		}

		var move = function (e) {

			console.log(isDown);

			if (isDown) {
				getMouse(e);
				getVel(e);
				getOffset();
				setTop(offset + start);
				getTop();
			}
		}

		var up = function (e) {

			console.log("end");
			isDown = false;
			//momentum();
		}

		var checkPage = function (e) {

			if (body.offset().left < 0) {
				togglePage(1,0);
			}
			else {
				togglePage(0,1);
			}
		}

		var togglePage = function (page, other) {

			console.log("toggle " + page + " " + other);

			i = page;

			scroll[ids[page]].set({enable:true});
			scroll[ids[other]].set({enable:false});

		}

		var initPans = function () {

			for (i in ids) {

				var elem = element[ids[i]];

				console.log(elem[0]);

				scroll[ids[i]] = new Hammer(elem[0]);

				scroll[ids[i]].get('pan').set({ direction: Hammer.DIRECTION_VERTICAL});
		        scroll[ids[i]].on('panstart', down);
		        scroll[ids[i]].on('pandown panup', move);
		        scroll[ids[i]].on('panend', up);

		    }
		}

		var initPress = function () {

			press = new Hammer(body[0]);

			press.get('press').set({time:10, threshold:5});

			press.on('press', function (e) {

				console.log("press " + e.center.x);

				checkPage(e);

			});

		}

		initPans();

		initPress();

        $scope.projectHeight = function (projects) {

			var sep = 0;

			for (i in projects) {

				sep += global.sep(projects[i]);
			}

			var result = projects.length*800 + sep;

			return result + "px";
		}

		$scope.contactHeight = function () {

			return "2500px";
		}

	}

	return {
		scope:{
			body:'@'
		},
		link:link
	}
}]);