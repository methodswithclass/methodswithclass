sharedModule.factory('global', ['$window', '$sce', '$location', 'events', function($window, $sce, $location, events) {

	var valid = "home";
	var invalid = "home";

	var resizeHandlers = {};

	var inbound = false;

	var forceMobile = true;

	var splitPath = function (path) {

		if (path.substr(0,1) == "/") {

			path = path.substr(1);
		}

		var pathArray = path.split("/");

		//console.log("path is " + path + " and it has length " + pathArray.length);

		var truncate = [];

		var j = 0;

		for (i in pathArray) {

			if (i > 1) truncate[j++] = pathArray[i];
		}

		var pathObj = {
			device:pathArray[0],
			state:pathArray[1],
			after:truncate
		};

		return pathObj;

	}

	var getBase = function () {

		var path = $location.url();

		var device = splitPath(path).device;

		//console.log("device is " + device);

		return device;
	}

	var isMobile = function () {

		return checkMobile(forceMobile);

	}

	var checkDevice = function () {

		return whatDevice(forceMobile);
	}

	var isPortrait = function () {

		var width = $(window).width();
		var height = $(window).height();

		//console.log("width " + width + " height " + height);

		if (width < height) {
			return true;
		}

		return false;
	}

	var getOrientation = function () {

		if (isPortrait()) {
			return {
				is:"port",
				isNot:"land"
			}
		}
		else {
			return {
				is:"land",
				isNot:"port"
			}
		}
	}

	var getChild = function (id, name) {

		return $("#blogs").find("#" + id + name);
	}

	var blogHeight = function (blog) {

		var percent;

		if (isMobile()) {
			percent = 0.8;
		}
		else {
			percent = 0.6;
		}

		var windowWidth = 1600;
		//var height = blog.meta_data.height;
		var name = blog.meta_data.name;
		var height = getChild("bottom", name).position().top;
		var factor = windowWidth/$(window).width()/percent;

		return height;
	}

	var setBlogHeight = function (blog) {

		var name = blog.meta_data.name;
		
		getChild("blog", name).css({height:blogHeight(blog) + "px"});
	}

	var bindResize = function (blog) {

		var name = blog.meta_data.name;

		resizeHandlers[name] =  function () {
			setBlogHeight(blog);
		}

		angular.element($window).bind('resize', resizeHandlers[name]);
	}

	var unbind = function (blog) {

		var name = blog.meta_data.name;

		angular.element($window).unbind('resize', resizeHandlers[name]);
	}

	var sep = function (project) {

		var percent;

		if (isMobile()) {
			percent = 0.3;
		}
		else {
			percent = 0.6;
		}

		var windowWidth = 1600;
		var sep = project.maxSep;
		var factor = windowWidth/$(window).width()/percent;

		return factor*sep;
	}

    return {
    	c:{
			valid:valid,
			invalid:invalid,
			direct:0,
			open:1,
			close:2
    	},
    	getChild:getChild,
    	blogHeight:blogHeight,
    	setBlogHeight:setBlogHeight,
    	bindResize:bindResize,
    	unbind:unbind,
    	isMobile:isMobile,
    	checkDevice:checkDevice,
    	isPortrait:isPortrait,
    	getOrientation:getOrientation,
    	getBase:getBase,
    	splitPath:splitPath,
    	sep:sep,
    	renderHtml:function (htmlCode) {
	        return $sce.trustAsHtml(htmlCode);
	    }
    } 

}]);