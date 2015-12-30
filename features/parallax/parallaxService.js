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


	var scroll;
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

	var getValues = function (params) {

		scroll = $("#" + params.scroll);
		space = $("#space" + params.space);
		elem = $("#parallax" + params.name);

		elemHeight = elem.height();
		elemOffset = elem.offset().top - scroll.offset().top;
		spaceHeight = space.height();
		spaceOffset = space.offset().top - scroll.offset().top;
		scrollHeight = $(window).height()*1.3;
		scrollWidth = $(window).width();

		minimum = -params.bottom*(elemHeight - spaceHeight);
		spread = 0.9*(elemHeight - spaceHeight);

		return {
			spaceHeight:spaceHeight,
			spaceOffset:spaceOffset,
			scrollHeight:scrollHeight,
			minimum:minimum,
			spread:spread
		}
	}

	var set = function (params) {

		//console.log(params.name);

		getValues(params);

		if (g.checkDevice() == desktop) { //check if browser is ie or not

			if (params.top)	{
				value = params.factor*spaceOffset/scrollHeight*spread + minimum;
			}
			else {
				value = -params.factor*(1-spaceOffset/scrollHeight)*spread + minimum;
			}

			elem.css({"bottom":value});

		}
		else {

			elem.css({"bottom":minimum});
		}
		
	}

	var imageAdjust = function () {

		var self = this;

		var img;
		var space;

		var aspect;

		var goodAspect = function (width, height) {

			if (Math.abs(width/height - aspect) < 0.01) {
				return true;
			}

			return false;
		}

		var checkHeight = function (height) {

	        if (height < space.height()) {

	            return "under";
	        }
	        else if (height > space.height()*1.2) {

	            return "over";
	        }

	        return "good";

	    }

	    var checkWidth = function (width) {

	        if (width < space.width()) {
	            return "under";
	        }
	        else if (width > space.width()*1.5) {

	            return "over";
	        }

	        return "good";
	    }

	    self.fix = function (params) {

	    	img = $("#img" + params.name);
	    	space = $("#space" + params.space);

	    	if ($(img)[0]) {

		    	if (params.first) aspect = img.width()/img.height();

		        var height = space.height()*1.2;
		        var width = height*aspect;
		        
		        if (checkWidth(width) == "under") {
		            console.log("width under " + name);
		            width = space.width();
		            height = width/aspect;
		            if (checkHeight(height) == "under") {
		                console.log("height under " + name);
		                height = space.height()*1.2;
		                width = height*aspect;
		            }
		        }
		        else if (checkWidth(width) == "over") {
		            console.log("width over " + name);
		            width = space.width()*1.2;
		            height = width/aspect;
		            if (checkHeight(height) == "under") {
		                console.log("height under " + name);
		                height = space.height()*1.2;
		                width = height*aspect;
		            }
		        }
		       
		       	
		       	if (checkWidth(width) && checkHeight(height)) {
		       		console.log("image good");
		       		if (goodAspect(width, height)) {
		       			console.log("aspect is good " + name + " " + aspect);
		       		}
		       		else {
			       		console.log("aspect is bad " + name + " " + aspect);
			       	}
		       	}

		        img.css({height:height, width:width});
	    	}
	        
	    }

	}


	return {
		getValues:getValues,
		set:set,
		imageAdjust:imageAdjust
	}

}]);