/**
 *	HTML5 Importer
 *	Simply import HTML Files through HTML5 "import" feature
 *
 *	Use:
 *		<link rel="import" href="file.html" data-target="#myDiv">
 *
 *	@author Gabriel Henrique Rudey: @whothey / @whothey_
 *	@version 1.2-beta
 */
(function() {
	var imports = document.querySelectorAll('link[rel="import"]')

	for (var i = 0; i < imports.length; i++) {
		var target = document.querySelector(imports[i].dataset.target)

		if (target == null || target.length == 0) continue

		if (imports[i].dataset.section == 'head')
			var cnodes = imports[i].import.head.childNodes
		else
			var cnodes = imports[i].import.body.childNodes

		if (imports[i].dataset.clear == 'true') {
			while (cnodes.length > 0)
				target.appendChild(cnodes.item(0))

			imports[i].remove()
		} else {
			for (var j = 0; j < cnodes.length; j++) 
				target.appendChild(cnodes.item(j).cloneNode(true))
		}
	}
})()
