app.factory('global', ['$sce', function($sce) {

	var project = "#projectContainer";
	var contact = "#contactContainer";

    return {
    	project:project,
    	contact:contact,
    	renderHtml:function (htmlCode) {
	        return $sce.trustAsHtml(htmlCode);
	    }
    }; 

}]);