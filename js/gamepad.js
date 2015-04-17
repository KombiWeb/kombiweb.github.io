var hasGP = false,
	showBut,
	repGP;

function canGame() {
	return "getGamepads" in navigator;
}
//Test the inputs of the Gamepad

function reportOnGamepad() {
	var gp = navigator.getGamepads()[0];
	var html = "";
	html += "id: "+gp.id+"<br/>";

	for(var i=0;i<gp.buttons.length;i++) {
		html+= "Button "+(i)+": ";
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

		$(window).on("gamepadconnected", function() {
			hasGP = true;
			gpConnected = true;

			Materialize.toast('Controller Conected', 3000,'rounded',function(){
				Materialize.toast('ID: '+navigator.getGamepads()[0].id, 3500, 'rounded');
			});

			//alert("Conected controller: "+navigator.getGamepads()[0].id+"\n\n Press 'O' to continue!");

			//$(".controller").show();
			$('.controller').fadeTo('slow', 1, function() {});

			console.log("connection event");
			repGP = window.setInterval(reportOnGamepad,100);
			showBut = window.setInterval(buttonsEvent,100);
		});

		$(window).on("gamepaddisconnected", function() {
			gpConnected = false;
			console.log("disconnection event");
			Materialize.toast('Controller Disconected', 3000,'rounded');
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

	if (gp.buttons[5].pressed) {
		if (gp.buttons[0].pressed) {
			console.log('pressed');
		}
	}

	else if (gp.buttons[0].pressed) { //button reportOnGamepad
		window.location.href = "#";
	}

	else if (gp.buttons[1].pressed) { //button U
		window.location.href = "http://whothey.github.io";
	}

	else if (gp.buttons[2].pressed) { //button Y
		window.location.href = "http://tsukini.github.io";
	}

}