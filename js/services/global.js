app.factory('global', ['$sce', function($sce) {

	var renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };

    return {
    	renderHtml:renderHtml
    }; 

}]);