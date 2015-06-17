app.factory('parallax', function () {

	var totalSections = 3;
	var heightFactor = 2.2;
	var defaultSep = 100;
	var minBottom = -215;
	var standardHeight = 1650;
	var standardWidth = 900;

	var offset;
	var scrollFactor;
	var imgOffset;
	var imgHeight;
	var elementHeight;
	var elementOffset;
	var scrollHeight;
	var scrollWidth;
	var value;

	var desktop = "desktop";
	var mobile = "mobile";
	var ie = "internet explorer";

	var parallax;

	var space;
	var image;

	var i;

	var isOpen = [false, false, false];

	var whatDevice = function () {

		if(navigator.userAgent.match(/Android/i) ||
	            navigator.userAgent.match(/webOS/i) ||
	            navigator.userAgent.match(/iPhone/i) ||
	            navigator.userAgent.match(/iPod/i) ||
	            navigator.userAgent.match(/iPad/i) ||
	            navigator.userAgent.match(/Blackberry/i) ) {

			return mobile;
		}
		else if (navigator.userAgent.indexOf('Firefox') != -1 || navigator.userAgent.indexOf('Chrome') != -1 || navigator.userAgent.indexOf('Safari') != -1) {

			return desktop;
		}
		else
			return ie;
	}

	var getScrollFactor = function (scrollHeight, scrollWidth) {

		var scrollFactor = (scrollHeight - standardHeight + 0.9)/(scrollWidth - standardWidth + 1);

		if (scrollFactor < 0) scrollFactor = -scrollFactor;

		if (scrollFactor > 1) scrollFactor = 1/scrollFactor;

		if (scrollFactor < 0.6) scrollFactor = 0.9;

		return scrollFactor;
	}

	var scroll = function () {

		for (i = 1; i <= totalSections; i++) {

			space = $("#space" + i);
			image = $("#img" + i);
		
			if (whatDevice() == desktop) {

				imgHeight = image.height();
				imgOffset = image.offset().top;
				elementHeight = space.height();
				elementOffset = space.offset().top;
				scrollHeight = $(window).height();
				scrollWidth = $(window).width();

				scrollFactor = getScrollFactor(scrollHeight, scrollWidth);

				value = scrollFactor*(elementOffset + elementHeight)/scrollHeight*700 - 600;
				
				image.css("bottom", value);

			}
			else {

				console.log("no browser");

				value = -175;
			
				image.css("bottom", value);	
			}

		}

	}


	var setup = function (outerContainer) {

		$scrollElement = outerContainer;

		offset = $("#space1").offset().top;

		$scrollElement.scroll(scroll);

		scroll();

		for (var j = 1; j <= totalSections; j++) {
			bindClickEvent(j);
		}

		$(window).resize(scroll);

	}

	return {
		whatDevice:whatDevice,
		scroll:scroll,
		bindClickEvent:bindClickEvent


	}

});