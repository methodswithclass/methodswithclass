badgesModule.directive("share", ['$window', 'data.service', function ($window, data) {

	return {

		restrict:'E',
		scope:{
			type:"@",
			name:"@",
			size:"@"
		},
		replace:true,
		template:'<div class="relative {{size}} pointer"></div>',
		link:function ($scope, element, attr) {

			var test = false;

			var prod = 'http://www.gentlephrasing.com';
			var dev = 'http://gentlephrasing-dev.herokuapp.com';

			var url =  (test ? dev : prod) + '/?b=' + $scope.name;

			var blog = data.getBlogByName($scope.name);

			$scope.img = $scope.type == "fb" ? "img/fbshare.png" : "img/twittershare.png";
			
			var img = "<img class='relative width height-auto' src='"+ $scope.img +"'/>"

			var getTweet = function () {

				return encodeURI(blog.share.description + "\n \n" + url);

			}

			if ($scope.type == "fb") {
				element.append(img);
			}
			else if ($scope.type == "twitter") {
				element.append("<a class='relative width height' href=\"https://twitter.com/intent/tweet?text="+ getTweet() +"\">"+img+"</a>")
			}

            element.on("click", function () {

            	console.log("share clicked");

            	if ($scope.type == "fb") {

	            	$window.asyncFBInit(test);

					FB.ui({
						method: 'feed',
						link:url,
					}, function(response){

						console.log("share response");
						console.log(response);

					});
            	}
            	else if ($scope.type == "twitter") {

            		console.log("clicked tweet");
            	}

            });

		}
	}
}]);