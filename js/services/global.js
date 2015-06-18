app.factory('global', ['$sce', function($sce) {

	var body = "#bodyContainer";
	var project = "#projectContainer";
	var contact = "#contactContainer";

    return {
    	body:body,
    	project:project,
    	contact:contact,
    	renderHtml:function (htmlCode) {
	        return $sce.trustAsHtml(htmlCode);
	    }
    }; 

}]);