app.factory("con", function() {

	var total = 15;
	var history = [];

	var thisCon;
		
	var refresh = function () {
			
		for (var i = 1; i < history.length; i++) {
			history[i-1] = history[i];
		}
		
		history.splice(history.length-1, 1);
	}
		
	var print = function () {
		
		var string = "";
		
		thisCon.html(string);
		
		for (i in history) {

			string += history[i] + "<br>";	
		}

		thisCon.html(string);
	}

	var log = function (text) {

		thisCon = $("#console");

		console.log(text);
		
		if (thisCon[0] && thisCon.is(":visible")) {
		
			history[history.length] = text;
			
			if (history.length == total)
				refresh();
			
			print();
		
		}
		
	}

	window.onerror = function (msg, url, linenumber) {
		log("Error: " + msg + ", in " + url + " at " + linenumber);
	}

	return {
		log:log
	}

});