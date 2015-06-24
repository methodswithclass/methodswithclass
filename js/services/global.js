app.factory('global', ['$sce', '$location', function($sce, $location) {

	var body = "#body";
	var project = "#projects";
	var contact = "#contact";
	var mProjects = "#mProjects";

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
    	mProjects:mProjects,
    	isMobile:isMobile,
    	renderHtml:function (htmlCode) {
	        return $sce.trustAsHtml(htmlCode);
	    }
    }; 

}]);