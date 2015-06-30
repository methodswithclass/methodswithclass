app.factory("con", function() {

	var total = 15;
	var history = [];

	var element;
	var thisCon;

	var register = function (thisConsole) {

		console.log("register");

		element = thisConsole.parent();
		thisCon = element.find("#consoleInner");
	}
		
	var refresh = function () {
			
		for (var i = 1; i < history.length; i++) {
			history[i-1] = history[i];
		}
		
		history.splice(history.length-1, 1);
	}
		
	var print = function () {

		var string = "";
		
		thisCon[0].innerHTML = string;
		
		for (i in history) {

			string += history[i] + "<br>";	
		}

		thisCon[0].innerHTML = string;
	}

	var log = function (text) {
		
		if (element && element.is(":visible")) {

			//console.log("is visible");
		
			history[history.length] = text;
			
			if (history.length == total)
				refresh();
			
			print();
		
		}
		
	}

	window.onerror = function (msg, url, linenumber) {
		log("Error: " + msg + ", in " + url + " at " + linenumber);
	}

	var attachToConsole = function () {
	    var oldLog = console.log;
	    console.log = function (message) {
	       	log(message);
	        oldLog.apply(console, arguments);
	    };
	}

	attachToConsole();

	return {
		register:register,
		log:log
	}

});