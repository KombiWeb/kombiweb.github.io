document.getElementById("toggleFullscreen").addEventListener("click", function(e) {
	e.preventDefault()
	
	if (document.webkitFullscreenElement) {
		document.webkitExitFullscreen()
	} else {
		document.documentElement.webkitRequestFullscreen()
	}

	return false
})
