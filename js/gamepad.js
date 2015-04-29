var hasGP = false,
	gpConnected = false,
	pressStart,
	gamepad,
	gpName,
	buttons_event,
	//repGP,
	connectTrigger;

function canGame() {
	return "getGamepads" in navigator;
}
//Test the inputs of the Gamepad
/*
function reportOnGamepad() {
	var html = "";
	html += "id: "+gamepad.id+"<br/>";

	for(var i=0;i<gamepad.buttons.length;i++) {
		html+= "Button "+(i)+": ";
		if(gamepad.buttons[i].pressed) html+= " pressed";
		html+= "<br/>";
	}
	
	html+= "Stick "+0+": "+gamepad.axes[0]+" | "+gamepad.axes[1]+"<br/>";
	html+= "Stick "+1+": "+gamepad.axes[2]+"<br/>";
	html+= "Stick "+2+": "+gamepad.axes[3]+" | "+gamepad.axes[4]+"<br/>";
	html+= "Stick "+3+": "+gamepad.axes[5]+"<br/>";
	html+= "Stick "+4+": "+gamepad.axes[6]+" | "+gamepad.axes[8]+"<br/>";
	html+= "Stick "+5+": "+gamepad.axes[9]+"<br/>";

	$("#gamepadDisplay").html(html);
}*/

$(document).ready(function() {
	if(canGame()) {
		
		$(window).on("gamepadconnected", function() {
			hasGP = true;
			console.log("You have some Gamepads connected! \nPress 'Start Button' to connect the first!");
			pressStart = window.setInterval(press_start,700);
			connectTrigger = window.setInterval(function() {
				//console.log('connection trigger');
				if (navigator.getGamepads()[0].buttons[15].pressed){
					if(gpConnected){
						disconnection();
					}
					else{
						connection();
					}
				}
			},500);
		});

		$(window).on("gamepaddisconnected", function() {
			console.log("disconnection event");
			hasGP = false;
			window.clearInterval(connectTrigger);
			disconnection();
			document.getElementById('press-start').style.display = 'none';
			window.clearInterval(pressStart);
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

function connection() {
	gpConnected = true;
	gamepad = navigator.getGamepads()[0];
	gpName = gamepad.id.indexOf('(')>-1 ? gamepad.id.substring(0, gamepad.id.indexOf('(')-1) : gamepad.id.substring(gamepad.id.lastIndexOf('-')+1);
	Materialize.toast(gpName+" Connected", 3000,'rounded',function(){});
	$('.controller').fadeTo('slow', 1, function() {
		$(this).css({display: 'block'})
	});
	console.log("Gamepad: "+navigator.getGamepads()[0].id+"\nPress 'Start Button' to disconnect!");
	//window.clearInterval(connectTrigger);
	document.getElementById('press-start').style.display = 'none';
	window.clearInterval(pressStart);
	buttonsEvent = window.setInterval(buttons_event,200);

	//repGP = window.setInterval(reportOnGamepad,200);
}

function disconnection() {
	gpConnected = false;
	console.log("Gamepad Disconnected");
	Materialize.toast(gpName+' Disconected', 2500,'rounded');
	$(".controller").fadeTo('fast',0, function(){
		$(this).hide();
	});
	document.getElementById('press-start').style.display = 'block';
	pressStart = window.setInterval(press_start,700);
	window.clearInterval(buttonsEvent);

	//window.clearInterval(repGP);
}

function press_start() {
	//console.log('press start');
	if (document.getElementById('press-start').style.visibility == 'visible')
		document.getElementById('press-start').style.visibility = 'hidden';
	else
		document.getElementById('press-start').style.visibility = 'visible';
}

function buttons_event() {
	//console.log('buttons event');
	if (gamepad.buttons[4].pressed || gamepad.buttons[5].pressed){
		
		if (gamepad.buttons[5].pressed && !gamepad.buttons[4].pressed) { // Top Button Right
			$(".controller-menu").show('fast');
			if (gamepad.buttons[0].pressed) { // Button O
				window.location.href = '/html5.html';
			}
			if (gamepad.buttons[1].pressed) { // Button U
				console.log('pressed');
				window.location.href = '/css3.html';
			}
			if (gamepad.buttons[2].pressed) { // Button Y
				console.log('pressed');
				window.location.href = '/jsapi.html';
			}
		}
		
		else if (gamepad.buttons[4].pressed && !gamepad.buttons[5].pressed) { // Top Button Left
			$(".controller-btn").show('fast');

			if (gamepad.buttons[0].pressed) { // Button O
				window.location.href = "#";
			}

			if (gamepad.buttons[1].pressed) { // Button U
				window.location.href = "http://whothey.github.io";
			}

			if (gamepad.buttons[2].pressed) { // Button Y
				window.location.href = "http://tsukini.github.io";
			}
		}
		
		if (!gamepad.buttons[4].pressed) {
			$(".controller-btn").hide('fast');
		}
		
		if (!gamepad.buttons[5].pressed) {
			$(".controller-menu").hide('fast');
		}

	}else {
		$(".controller-btn").hide('fast');
		$(".controller-menu").hide('fast');
	}	

	if (gamepad.axes[4] != 0) {  // Right Stick Y-axis
		window.scrollBy(0,gamepad.axes[4]*50);
		if (gamepad.axes[4] > 0) {
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

	if (gamepad.axes[3] != 0) {  //Right Stick X-axis
		window.scrollBy(gamepad.axes[3]*50,0);
		if (gamepad.axes[3] > 0) {
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