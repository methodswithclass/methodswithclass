





var getAngularModules = function (application) {
	
	application.factory("general", ["$sce", function ($sce) {


		return {
			renderHtml:function (htmlCode) {
	        	return $sce.trustAsHtml(htmlCode);
	    	}
		}

	}])
}







