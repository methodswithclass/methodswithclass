app.factory('global', ['$sce', '$location', function($sce, $location) {

	var isMobile = function () {

		console.log($location.url());

		if ($location.url() == "/mobile") {	
			return true;
		}

		return false;

	}

    return {
    	isMobile:isMobile,
    	renderHtml:function (htmlCode) {
	        return $sce.trustAsHtml(htmlCode);
	    }
    }; 

}]);