# HTML5, CSS3, JS: The new web features

## Topics

### HTML5
	contenteditable: Anything is a "input"!
	Media:           Audio, video, and 3D Applications on-demand

### CSS3
	gradient-colors: A new way to style web
	multiple-values: Multi-values to a single property
	transition:      Easy CSS animation
	keyframes:		 Animation in CSS

### JS
	querySelector: Free from jQuery and document.getElementById()
	datasets:      Custom data across DOM elements
	Gamepad API:   Easy access to Gamepads
	Speech API:    The webkit wonder to speech-to-text recognition

## Project Setup

The project uses some CSS pre-processors and JS Task-runners, for maximum performance is recommended to use:

 - [SASS](http://sass-lang.com/install)
	 - You may need [Ruby](https://www.ruby-lang.org/en/downloads/)
 - [Grunt](http://gruntjs.com/getting-started)
	 - You may need [NodeJS](https://nodejs.org/) and [npm](https://docs.npmjs.com/getting-started/installing-node)

Some standard files are already "compiled" and are part of the website code, but for any update on JS and CSS/SASS you may enable the `watchers`:

Enable to, any updates on JS files, the "recompiling" to main.min.js:
```sh
	cd ../project/root
	grunt
```

Enable to, any updates on SCSS/SASS files, the "recompiling" to main.min.css:
```sh
	cd ../project/root
	sass --watch main.scss:../css/main.min.css --style compressed
```

## Team
[@cleitonPiccini](https://github.com/cleitonPiccini) (Cleiton Piccini)
[@whothey](https://github.com/whothey) (Gabriel Henrique Rudey)
[@TADebastiani](https://github.com/TADebastiani) (Tiago Adalberto Debastiani)