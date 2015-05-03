
function startVideo(){

	if (document.getElementById("idvideo").style.display="none") {

		document.getElementById("idvideo").style.display="block";
	}

	var video = document.getElementById("idvideo");
 
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
 
	if (navigator.getUserMedia) {       
    	navigator.getUserMedia({
    		video: true,
    		autoplay: true
    	}, handleVideo, videoError);
    	console.debug("oi")
	}
 
	function handleVideo(stream) {
    	video.src = window.URL.createObjectURL(stream);
    	console.debug("oid de novo")
	}
 
	function videoError(e) {
		console.debug("deu errooooooo")
	}
}