app.factory('global', ['$sce', '$location', function($sce, $location) {

	var body = "#bodyContainer";
	var project = "#projectContainer";
	var contact = "#contactContainer";
	var scrollContainer = "#mProjects";

	var isMobile = function () {

		console.log($location.url());

		if ($location.url() == "/mobile") {	
			return true;
		}

		return false;

	}

    return {
    	body:body,
    	project:project,
    	contact:contact,
    	scrollContainer:scrollContainer,
    	isMobile:isMobile,
    	renderHtml:function (htmlCode) {
	        return $sce.trustAsHtml(htmlCode);
	    }
    }; 

}]);