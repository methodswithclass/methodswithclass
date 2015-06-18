var desktop = "desktop";
var mobile = "mobile";
var ie = "internet explorer";

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