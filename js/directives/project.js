
console.log(app);

app.directive('project', function () {
	return {

		restrict:'E',
		scope:{
			info:'='
		},
		templateUrl:'views/project.html'
	};

});