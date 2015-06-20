app.factory('global', ['$sce', '$location', function($sce, $location) {

	var body;
	var project = "#projectContainer";
	var contact = "#contactContainer";

	var isMobile = function () {

		console.log($location.url());

		if ($location.url() == "/mobile"){
			body = "#mBodyContainer";
			return true;
		}

		body = "#bodyContainer";

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