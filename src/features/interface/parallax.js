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

function refreshBackgrounds(selector) {
	// Chrome shim to fix http://groups.google.com/a/chromium.org/group/chromium-bugs/browse_thread/thread/1b6a86d6d4cb8b04/739e937fa945a921
	// Remove this once Chrome fixes its bug.
	if (/chrome/.test(navigator.userAgent.toLowerCase())) {
		console.log("refresh image");
		$(selector).each(function() {
			var $this = $(this);
			if ($this.css("background-image")) {
				var oldBackgroundImage = $this.css("background-image");
				setTimeout(function() {
					$this.css("background-image", oldBackgroundImage);
				}, 1);
			}
		});
	}
}