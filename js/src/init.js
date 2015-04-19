$(".button-collapse").sideNav();

document.getElementById("toggleFullscreen").addEventListener("click", function(e) {
	e.preventDefault()
	document.documentElement.webkitRequestFullscreen()

	return false
})