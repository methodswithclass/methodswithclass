(function(){

	console.log("parallax module");

	var parallax = document.querySelectorAll(".parallax"),
	speed = 0.5;

	$("#body").scroll(function(){

		console.log("parallax scroll");

		[].slice.call(parallax).forEach(function(el,i){

			var windowYOffset = window.pageYOffset,
			elBackgrounPos = (windowYOffset * speed) + "px";

			el.style.backgroundPosition = elBackgrounPos;

		});
	});

})();