app.factory("con", function() {

	var total = 15;
	var history = [];

	var conCont;
	var thisCon;

	var register = function (thisConsole) {

		console.log("register");

		conCont = thisConsole;
		thisCon = conCont.find("#console");
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
		
		if (conCont.is(":visisble")) {

			console.log("is visible");
		
			history[history.length] = text;
			
			if (history.length == total)
				refresh();
			
			print();
		
		}
		else {
			console.log("is not visible");
		}
		
	}

	window.onerror = function (msg, url, linenumber) {
		log("Error: " + msg + ", in " + url + " at " + linenumber);
	}

	var attachToConsole = function () {
	    var oldLog = console.log;
	    console.log = function (message) {
	       	//log(message);
	        oldLog.apply(console, arguments);
	    };
	}

	attachToConsole();

	return {
		register:register,
		log:log
	}

});