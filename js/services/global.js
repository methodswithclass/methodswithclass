app.factory('global', ['$sce', '$location', function($sce, $location) {

	var sep = function (project) {
		
		var percent;

		if (global.isMobile()) {
			percent = 0.4;
		}
		else {
			percent = 0.8;
		}

		var windowWidth = 1600;
		var sep = project.maxSep;
		var factor = windowWidth/$(window).width()/percent;

		return factor*sep;
	}

	var isMobile = function () {

		console.log($location.url());

		if ($location.url() == "/mobile") {	
			return true;
		}

		return false;

	}

    return {
    	sep:sep,
    	isMobile:isMobile,
    	renderHtml:function (htmlCode) {
	        return $sce.trustAsHtml(htmlCode);
	    }
    }; 

}]);