var hasGP = false,
	showBut,
	repGP;

function canGame() {
	return "getGamepads" in navigator;
}
//Test the inputs of the Gamepad
/*
function reportOnGamepad() {
	var gp = navigator.getGamepads()[0];
	var html = "";
	html += "id: "+gp.id+"<br/>";

	for(var i=0;i<gp.buttons.length;i++) {
		html+= "Button "+(i)+": ";
		if(gp.buttons[i].pressed) html+= " pressed";
		html+= "<br/>";
	}
	
	html+= "Stick "+0+": "+gp.axes[0]+" | "+gp.axes[1]+"<br/>";
	html+= "Stick "+1+": "+gp.axes[2]+"<br/>";
	html+= "Stick "+2+": "+gp.axes[3]+" | "+gp.axes[4]+"<br/>";
	html+= "Stick "+3+": "+gp.axes[5]+"<br/>";
	html+= "Stick "+4+": "+gp.axes[6]+" | "+gp.axes[8]+"<br/>";
	html+= "Stick "+5+": "+gp.axes[9]+"<br/>";

	$("#gamepadDisplay").html(html);
}
*/

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
			$('.controller').fadeTo('slow', 1, function() {
				$(this).css({display: 'block'})
			});
			console.log("connection event");
			//repGP = window.setInterval(reportOnGamepad,100);
			showBut = window.setInterval(buttonsEvent,100);
		});

		$(window).on("gamepaddisconnected", function() {
			gpConnected = false;
			console.log("disconnection event");
			Materialize.toast('Controller Disconected', 3000,'rounded');
			$(".controller").hide();
			//window.clearInterval(repGP);
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


	if (gp.buttons[4].pressed || gp.buttons[5].pressed){
		
		if (gp.buttons[5].pressed && !gp.buttons[4].pressed) { // Top Button Right
			$(".controller-menu").show('fast');
			if (gp.buttons[0].pressed) { // Button O
				window.location.href = '/html5.html';
			}
			if (gp.buttons[1].pressed) { // Button U
				console.log('pressed');
				window.location.href = '/css3.html';
			}
			if (gp.buttons[2].pressed) { // Button Y
				console.log('pressed');
				window.location.href = '/jsapi.html';
			}
		}
		
		else if (gp.buttons[4].pressed && !gp.buttons[5].pressed) { // Top Button Left
			$(".controller-btn").show('fast');

			if (gp.buttons[0].pressed) { // Button O
				window.location.href = "#";
			}

			if (gp.buttons[1].pressed) { // Button U
				window.location.href = "http://whothey.github.io";
			}

			if (gp.buttons[2].pressed) { // Button Y
				window.location.href = "http://tsukini.github.io";
			}
		}
		
		if (!gp.buttons[4].pressed) {
			$(".controller-btn").hide('fast');
		}
		
		if (!gp.buttons[5].pressed) {
			$(".controller-menu").hide('fast');
		}

	}else {
		$(".controller-btn").hide('fast');
		$(".controller-menu").hide('fast');
	}

	if (gp.axes[4] != 0) {  // Right Stick Y-axis
		window.scrollBy(0,gp.axes[4]*50);
		if (gp.axes[4] > 0) {
			$("#stickR-down").show();
		}
		else {
			$("#stickR-up").show();
		}
	} 
	else if (gp.axes[4] == 0) {
		$("#stickR-down").hide();
		$("#stickR-up").hide();
	}

	if (gp.axes[3] != 0) {  //Right Stick X-axis
		window.scrollBy(gp.axes[3]*50,0);
		if (gp.axes[3] > 0) {
			$("#stickR-right").show();
		}
		else {
			$("#stickR-left").show();
		}
	} 
	else if (gp.axes[4] == 0) {
		$("#stickR-right").hide();
		$("#stickR-left").hide();
	}
}