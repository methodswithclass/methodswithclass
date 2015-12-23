parallaxModule.factory("parallax.service", ['$q', 'data.service', 'global', function ($q, data, g) {


	var standardHeight = 1650;
	var standardWidth = 900;
	var scrollHeight;
	var scrollWidth;


	var scrollFactor;
	var windowFactor;
	var elemHeight;
	var elemOffset;
	var spaceHeight;
	var spaceOffset;
	var spread;
	var minimum;
	var value;


	var space;
	var elem;

	var checkDom = function () {

		var result = true;

		return $q(function (resolve, reject) {

			for (i in blogs) {

				if (!$("#img" + blogs[i].meta_data.name)[0]) {
					result = false;
					reject(false);
					break;
				}
			}

			if (result) {
				resolve(true);
			}

		});
	}

	var resolveFactor = function (factor) {

		if (factor < 0) factor = -factor;

		//if (factor > 1) factor = 1;

		if (factor < 0.75) factor = 0.75;

		return factor;
	}

	var set = function (params) {

		//console.log(params.name);

		space = $("#space" + params.name);
		elem = $("#parallax" + params.name);

		elemHeight = elem.height();
		elemOffset = elem.offset().top;
		spaceHeight = space.height();
		spaceOffset = space.offset().top;
		scrollHeight = $(window).height()*1.3;
		scrollWidth = $(window).width();

		spread = 0.9*(elemHeight - spaceHeight);
		minimum = -params.bottom*(elemHeight - spaceHeight);

		if (g.checkDevice() == desktop) { //check if browser is ie or not

			//is not ie

			windowFactor = (scrollHeight - standardHeight + 0.9)/(scrollWidth - standardWidth + 1);

			scrollFactor = resolveFactor(windowFactor*params.factor);

			console.log((spaceOffset - params.start));

			if (params.top)	{
				value = -1*Math.abs(scrollFactor*(spaceOffset - params.start)/scrollHeight*spread + minimum);
			}
			else {
				value = -1*Math.abs(scrollFactor*(1-(spaceOffset - params.start)/scrollHeight)*spread + minimum);
			}
			
			elem.css({"bottom":value});

		}
		else {

			//is ie
			
			//console.log(minimum);

			elem.css({"bottom":minimum});
		}
		
	}

	return {
		set:set
	}

}]);