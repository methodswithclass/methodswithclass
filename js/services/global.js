app.factory('global', ['$sce', '$location', function($sce, $location) {

	var body = "#bodyContainer";
	var project = "#projectContainer";
	var contact = "#contactContainer";

	var isMobile = function () {

		if ($location.url() == "/mobile"){

			return true;
		}

		return false;

	}

    return {
    	body:body,
    	project:project,
    	contact:contact,
    	isMobile:isMobile,
    	renderHtml:function (htmlCode) {
	        return $sce.trustAsHtml(htmlCode);
	    }
    }; 

}]);