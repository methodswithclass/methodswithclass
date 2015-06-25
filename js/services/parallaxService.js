app.factory("parallaxService", ['global', function (global) {


	var standardHeight = 1650;
	var standardWidth = 900;

	var scrollFactor;
	var imgOffset;
	var imgHeight;
	var elementHeight;
	var elementOffset;
	var scrollHeight;
	var scrollWidth;
	var value;

	var space;
	var image;

	var getScrollFactor = function (scrollHeight, scrollWidth) {

		var scrollFactor = (scrollHeight - standardHeight + 0.9)/(scrollWidth - standardWidth + 1);

		if (scrollFactor < 0) scrollFactor = -scrollFactor;

		if (scrollFactor > 1) scrollFactor = 1/scrollFactor;

		if (scrollFactor < 0.6) scrollFactor = 0.9;

		return scrollFactor;
	}

	var set = function (project) {

		space = $("#space" + project.id);
		image = $("#img" + project.id);

		//console.log(space.height());
	
		if (whatDevice() == desktop) {

			imgHeight = image.height();
			imgOffset = image.offset().top;
			elementHeight = space.height();
			elementOffset = space.offset().top;
			scrollHeight = $(window).height();
			scrollWidth = $(window).width();


			if (project.id == "nuplae")	console.log("elementOffset " + elementOffset + " imgOffset " + imgOffset);

			scrollFactor = getScrollFactor(scrollHeight, scrollWidth);

			value = scrollFactor*(elementOffset + elementHeight)/scrollHeight*700 - 600;
			
			//console.log(value);

			image.css({"bottom":value});

		}
		else {

			console.log("no browser");

			value = -175;
		
			image.css({"bottom":value});	
		}
	}

	return {

		set:set
	}

}]);