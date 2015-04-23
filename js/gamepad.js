var hasGP = false,
	showBut,
	repGP,
	connectTrigger
	gpConnected = false;

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
$(document).ready(function() {
	
	if(canGame()) {


		$(window).on("gamepadconnected", function() {
			hasGP = true;
			console.log("You have some Gamepads connected! \nPress 'Start Button' to connect the first!");
			connectTrigger = window.setInterval(function() {
				if (navigator.getGamepads()[0].buttons[15].pressed){
					if(gpConnected)
						disconnection();
					else
						connection();
				}
			},500);
		});

		$(window).on("gamepaddisconnected", function() {
			console.log("disconnection event");
			hasGP = false;
			window.clearInterval(connectTrigger);
		});

		//setup an interval for Chrome
		
		var checkGP = window.setInterval(function() {
			//console.log('checkGP');
			if(navigator.getGamepads()[0]) {
				if(!hasGP) $(window).trigger("gamepadconnected");
				window.clearInterval(checkGP);
			}
		}, 500);		

	}

});

function connection() {
	gpConnected = true;
	Materialize.toast(navigator.getGamepads()[0].id.slice(0, navigator.getGamepads()[0].id.indexOf('(')-1)+" Connected", 3000,'rounded',function(){});
	$('.controller').fadeTo('slow', 1, function() {
		$(this).css({display: 'block'})
	});
	console.log("Gamepad: "+navigator.getGamepads()[0].id+"\nPress 'Start Button' to disconnect!");
;
	//repGP = window.setInterval(reportOnGamepad,100);

	showBut = window.setInterval(buttonsEvent,100);
}

function disconnection() {
	gpConnected = false;
	console.log("Gamepad Disconnected");
	Materialize.toast(navigator.getGamepads()[0].id.slice(0, navigator.getGamepads()[0].id.indexOf('(')-1)+' Disconected', 2500,'rounded');
	$(".controller").fadeTo('fast',0, function(){
		$(this).hide();
	});

	//window.clearInterval(repGP);

	window.clearInterval(showBut);
}

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
				$('#btucra').trigger('onClick');
				//window.location.href = "http://whothey.github.io";
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
			$("#stickR-up").hide();
			$("#stickR-down").show();
		}
		else {
			$("#stickR-down").hide();
			$("#stickR-up").show();
		}
	} 
	else  {
		$("#stickR-down").hide();
		$("#stickR-up").hide();
	}

	if (gp.axes[3] != 0) {  //Right Stick X-axis
		window.scrollBy(gp.axes[3]*50,0);
		if (gp.axes[3] > 0) {
			$("#stickR-left").hide();
			$("#stickR-right").show();
		}
		else {
			$("#stickR-right").hide();
			$("#stickR-left").show();
		}
	} 
	else  {
		$("#stickR-right").hide();
		$("#stickR-left").hide();
	}
}