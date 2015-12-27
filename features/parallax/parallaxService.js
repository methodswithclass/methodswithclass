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

	var active;

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

		var sign = 1;

		if (factor < 0) sign = -1;

		//if (factor > 1) factor = 1;

		if (Math.abs(factor) < 0.75) factor = sign*0.75;

		return factor;
	}

	var getValues = function (params) {

		space = $("#space" + params.space);
		elem = $("#parallax" + params.name);

		elemHeight = elem.height();
		elemOffset = elem.offset().top;
		spaceHeight = space.height();
		spaceOffset = space.offset().top;
		scrollHeight = $(window).height()*1.3;
		scrollWidth = $(window).width();

		minimum = -params.bottom*(elemHeight - spaceHeight);
		spread = 0.9*(elemHeight - spaceHeight);

		return {
			spaceHeight:spaceHeight,
			spaceOffset:spaceOffset,
			scrollHeight:scrollHeight,
			minimum:minimum,
			spread:spread,
			active:active
		}
	}

	var set = function (params) {

		//console.log(params.name);

		getValues(params);

		if (g.checkDevice() == desktop) { //check if browser is ie or not

			//is not ie

			windowFactor = spaceHeight*1.2/elemHeight;

			scrollFactor = resolveFactor(windowFactor*params.factor);

			//console.log((spaceOffset - params.start));

			if (params.top)	{
				value = scrollFactor*spaceOffset/scrollHeight*spread + minimum;
			}
			else {
				value = -scrollFactor*(1-spaceOffset/scrollHeight)*spread + minimum;
			}

			if (params.name == "nuplae"){
				//console.log(params.name + ":" + value);
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
		getValues:getValues,
		set:set
	}

}]);