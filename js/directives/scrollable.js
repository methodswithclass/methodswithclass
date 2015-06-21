
app.directive("scrollable", function () {

	return {

		link:function (scope, element, attr) {

			var start;
			var top;
			var mouse = [];
			var i = 0;
			var vel0;
			var vel;
			var pos0;
			var pos;
			var time0;
			var time;
			var interval;

			var mu = 0.01;

			var getMouse = function (e) {

				return {x:e.pageX, y:e.pageY};
			}

			var getTime = function () {

				return (new Date()).getTime();
			}

			var scroll = function (to) {

				pos = to - start.y + top;

				element.style.top = pos + 'px';

				return to;
			}

			var momentum = function (vel0) {

				var timer = setInterval(function () {

					console.log("momentum");

					pos0 = scroll(vel0*interval);

					vel0 *= (1-mu);

				}, 50);
			}

			element.bind('touchstart', function (e) {

				start = getMouse(e);
				mouse[0] = start;
				top = element.offset.top();
				i = 1;
				time0 = getTime();
			});

			element.bind('touchmove', function (e) {

				time = time0;
				time0 = getTime();

				interval = time - time0;

				mouse[i] = getMouse(e);

				vel0 = mouse[i].y - mouse[i-1].y;

				pos0 = scroll(mouse[i++].y);
			});

			element.bind('touchend', function (e) {

				mouse[i] = getMouse(e);

				momentum(vel0);
				
			});

		}
	}
})