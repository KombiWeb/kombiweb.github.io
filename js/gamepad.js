var hasGP = false;
var repGP;
var showBut;


function canGame() {
	return "getGamepads" in navigator;
}

function reportOnGamepad() {
	var gp = navigator.getGamepads()[0];
	var html = "";
	html += "id: "+gp.id+"<br/>";

	for(var i=0;i<gp.buttons.length;i++) {
		html+= "Button "+(i+1)+": ";
		if(gp.buttons[i].pressed) html+= " pressed";
		html+= "<br/>";
	}

	for(var i=0;i<gp.axes.length; i+=2) {
		html+= "Stick "+(Math.ceil(i/2)+1)+": "+gp.axes[i]+","+gp.axes[i+1]+"<br/>";
	}

	$("#gamepadDisplay").html(html);
}

function buttonPressed(b) {
	if (typeof(b) == "object") {
		return b.pressed;
	}
	return b == 1.0;
}

$(document).ready(function() {
	
	if(canGame()) {

		var prompt = "To begin using your gamepad, connect it and press any button!";

		$("#gamepadPrompt").text(prompt);

		$(window).on("gamepadconnected", function() {
			hasGP = true;
			gpConnected = true;
			alert("Conected controller: "+navigator.getGamepads()[0].id+"\n\n Press 'O' to continue!");
			$("#gamepadPrompt").html("Gamepad connected!");
			$(".controller").show();
			console.log("connection event");
			repGP = window.setInterval(reportOnGamepad,100);
			showBut = window.setInterval(buttonsEvent,100);
		});

		$(window).on("gamepaddisconnected", function() {
			gpConnected = false;
			console.log("disconnection event");
			$("#gamepadPrompt").text(prompt);
			$(".controller").hide();
			window.clearInterval(repGP);
			window.clearInterval(showBut);
		});

		//setup an interval for Chrome
		var checkGP = window.setInterval(function() {
			console.log('checkGP');
			if(navigator.getGamepads()[0]) {
				if(!hasGP) $(window).trigger("gamepadconnected");
				window.clearInterval(checkGP);
			}
		}, 500);		
	}
});


function buttonsEvent() {
	var gp = navigator.getGamepads()[0];

	if (gp.buttons[0].pressed) { //button O
		window.location.href = "#";
	}

	if (gp.buttons[1].pressed) { //button U
		window.location.href = "http://whothey.github.io";
	}

	if (gp.buttons[2].pressed) { //button Y
		window.location.href = "http://tsukini.github.io";
	}
}