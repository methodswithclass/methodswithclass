blogModule.directive("content", ['$q', 'data.service', 'parallax.service', 'global', function ($q, data, parallax, g) {

	

	return {
		restrict:'E',
		scope:false,
		replace:true,
		template:'<div ng-include="getContentUrl()"></div>',
		link:function ($scope, element, attr) {

			$scope.getContentUrl = function() {
				//console.log($scope.view);
                return 'features/views/' + attr.view;
            }

            if ($scope.blog.meta_data.published) {
            	$scope.sections = $scope.blog.content.body.sections;
            }
            else {
            	$scope.sections = $scope.blog.content.body.unpublish;
            }

			var top;
			var bottom;
			var openButton;
			var elem;

			var blogs = data.blogs;

			var getHeight = function () {

				var height;
				var heightClass;

				if (g.isMobile()) {
					height = 400;
					heightClass = "height-400"
				}
				else {
					height = 100;
					heightClass = "height-100"
				}

				console.log("height " + height + " class " + heightClass);

				return {
					height:height,
					heightClass:heightClass
				}
			}

			var close = function (blog) {

				var name = blog.meta_data.name;
				
				console.log("close " + name);
				
				$scope.opened[name] = false;
				
				var h = getHeight();
				
				openButton = g.getChild("open", name)[0];
				
				elem = g.getChild("blog", name);
				
				openButton.innerHTML = "open";
				
				elem.animate({height:h.height}, 300, function () {
					elem.addClass(h.heightClass);
					parallax.set(name);
					g.unbind(blog);
				});

			}

			var areClosed = function () {

				var opened = $scope.opened;

				for (i in opened) {

					console.log("is opened " + opened[i]);
					if (opened[i]) {
						return false;
					}
				}

				return true;
			}

			var closeOthers = function (except_name) {

				var names = [];
				var name;
				var i;

				for (var j = 0; j < blogs.length; j++) {

					names[j] = blogs[j].meta_data.name;
				}

				var deferred = $q.defer();

			    var closeBlog = function (i) {

			    	return $q(function (resolve, reject) {

			    		name = names[i];

			    		if (name != except_name) {

			    			var h = getHeight();

						    $scope.opened[name] = false;
							openButton = g.getChild("open", name)[0];
							elem = g.getChild("blog", name);
							openButton.innerHTML = "open";
							elem.animate({height:h.height}, 300, function () {
								elem.addClass(h.heightClass);
								return resolve(i);
							});
						}
						else {
							return resolve(i);
						}

					});
				}

				var promise = closeBlog(0)  
			    .then(function(i) {
			        return closeBlog(i+1);
			    })
			    .then(function(i) {
			        return closeBlog(i+1);
			    });

			    
			    deferred.resolve(closeBlog);


			    return deferred.promise;

				
			}

			var open = function (blog) {

				var name = blog.meta_data.name;
				//var height = g.blogHeight(blog);
				
				var height;
				var h = getHeight();

				$scope.opened[name] = true;
				var didclose = closeOthers(name);
				didclose.then(function (i) {

					//var h = getHeight();
					// var bottomElem = getChild("bottom", name);
					// alert("top " + bottomElem.position().top + " height " + bottomElem.height());
					// //top = getChild("top", name).offset().top;
				 	height = g.getChild("bottom", name).position().top;
				 	// console.log("blog height " + height);

				 	openButton = g.getChild("open", name)[0];
					elem = g.getChild("blog", name);
				 	openButton.innerHTML = "close";
					
					elem.removeClass(h.heightClass);
					elem.animate({height:height}, 300, function () {

						//alert("blog height " + height);
						$("#body").scrollTo(elem, 300);

						g.bindResize(blog);
					});
					
				});

			}

			$scope.toggleArticle = function (blog) {

				var name = blog.meta_data.name;
				var result = $scope.opened[name];

				console.log("toggle article is opened " + result);

				if (!result) {

					open(blog);
				}
				else {

					close(blog);
				}
			}

		}
	}

}]);