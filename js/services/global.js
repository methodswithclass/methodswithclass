app.factory('global', ['$sce', function($sce) {

    return {
    	renderHtml:function (htmlCode) {
	        return $sce.trustAsHtml(htmlCode);
	    }
    }; 

}]);