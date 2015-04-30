var hasGP = false,
	gpConnected = false,
	repGPActive = false,
	pressStart,
	gamepad,
	gpName,
	buttons_event,
	repGP,
	connectTrigger,
	count;

$(document).ready(function() {
	if(canGame()) {
		
		$(window).on("gamepadconnected", function() {
			hasGP = true;
			console.log("You have some Gamepads connected! \nPress 'Start Button' to connect the first!");
			pressStart = window.setInterval(press_start,700);
			connectTrigger = window.setInterval(connect_trigger,300);
		});

		$(window).on("gamepaddisconnected", function() {
			console.log("disconnection event");
			hasGP = false;
			window.clearInterval(connectTrigger);
			disconnection();
			document.getElementById('press-start').style.display = 'none';
			window.clearInterval(pressStart);
			window.clearInterval(connectTrigger);
		});

		//setup an interval for Chrome
		var checkGP = window.setInterval(function() {
			//console.debug('checkGP');
			if(navigator.getGamepads()[0]) {
				if(!hasGP) $(window).trigger("gamepadconnected");
				window.clearInterval(checkGP);
			}
		}, 500);
	}
});

function canGame() {
	return "getGamepads" in navigator;
}

//Test the inputs of the Gamepad
function reportOnGamepad() {
	var html = "";
	html += "<h5>"+gamepad.id+"</h5>";

	for(var i=0;i<gamepad.buttons.length;i++) {
		html+= "<p>Button "+(i)+": ";
		if(gamepad.buttons[i].pressed) html+= " pressed";
		html+= "</p>";
	}
	
	for (var i=0; i<gamepad.axes.length;i++){
		html+= "<p>Stick "+i+": <progress value='"+(gamepad.axes[i]+1)+"' max='2'</progress>";
	}

	$("#gamepadDisplay").html(html);
}

function connection() {
	gpConnected = true;
	gamepad = navigator.getGamepads()[0];
	gpName = gamepad.id.indexOf('(')>-1 ? gamepad.id.substring(0, gamepad.id.indexOf('(')-1) : gamepad.id.substring(gamepad.id.lastIndexOf('-')+1);
	Materialize.toast(gpName+" Connected", 3000,'rounded',function(){});
	$('.controller').fadeTo('slow', 1, function() {
		$(this).css({display: 'block'})
	});
	console.log("Gamepad: "+navigator.getGamepads()[0].id+"\nPress 'Start Button' to disconnect!");
	window.clearInterval(connectTrigger);
	document.getElementById('press-start').style.display = 'none';
	window.clearInterval(pressStart);
	buttonsEvent = window.setInterval(buttons_event,200);

}

function disconnection() {
	gpConnected = false;
	console.log("Gamepad Disconnected");
	Materialize.toast(gpName+' Disconected', 2500,'rounded');
	$(".controller").fadeTo('fast',0, function(){
		$(this).hide();
	});
	document.getElementById('press-start').style.display = 'block';
	window.clearInterval(buttonsEvent);
	pressStart = window.setInterval(press_start,700);
	connectTrigger = window.setInterval(connect_trigger,300);
}

function connect_trigger() {
	//console.debug('connection trigger');
	if (count>0){
		count--;
	} else if (navigator.getGamepads()[0].buttons[15].pressed){
		connection();
		count = 10;
	}
}

function press_start() {
	//console.debug('press start');
	if (document.getElementById('press-start').style.visibility == 'visible')
		document.getElementById('press-start').style.visibility = 'hidden';
	else
		document.getElementById('press-start').style.visibility = 'visible';
}

function buttons_event() {
	//console.debug('buttons event');
	gamepad = navigator.getGamepads()[0];

	if (count>0) {
		count--;
	} else if (gamepad.buttons[15].pressed){
		disconnection();
		count = 10;
	}

	if (gamepad.buttons[4].pressed || gamepad.buttons[5].pressed){
		
		if (gamepad.buttons[5].pressed && !gamepad.buttons[4].pressed) { // Top Button Right
			$(".controller-menu").show('fast');
			if (gamepad.buttons[0].pressed) { // Button O
				window.location.href = '/html5.html';
			}
			if (gamepad.buttons[1].pressed) { // Button U
				window.location.href = '/css3.html';
			}
			if (gamepad.buttons[2].pressed) { // Button Y
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

		else if (gamepad.buttons[4].pressed && gamepad.buttons[5].pressed) { // Both Top Buttons
			$(".controller-footer").show('fast');
			if (gamepad.buttons[0].pressed)
				window.location.href = "#!"
			if (gamepad.buttons[1].pressed)
				window.location.href = "#!"
			if (gamepad.buttons[2].pressed)
				window.location.href = "http://materializecss.com"
		}
		
		if (!gamepad.buttons[4].pressed) {
			$(".controller-btn").hide('fast');
		}
		
		if (!gamepad.buttons[5].pressed) {
			$(".controller-menu").hide('fast');
		}

		if (!gamepad.buttons[4].pressed && !gamepad.buttons[5].pressed) {
			$(".controller-footer").hide('fast');
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

	if (gamepad.buttons[4].pressed && gamepad.buttons[5].pressed && gamepad.buttons[6].pressed && gamepad.buttons[7].pressed){ // Both Top Buttons and Both Axis Buttons
		if(repGPActive){
			$("#gamepadDisplay").hide();
			window.clearInterval(repGP);
			repGPActive = false;
		}
		else{
			$("#gamepadDisplay").show();
			repGP = window.setInterval(reportOnGamepad,200);
			repGPActive = true;
		}
	}
}
