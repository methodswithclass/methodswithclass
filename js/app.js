var app = angular.module("methodswithclass", []);

app.directive('functions', ['$sce', function ($sce) {

	var renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };

    return {
    	renderHTML:renderHTML
    };
}]);