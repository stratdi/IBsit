// Initialize function
var init = function() {
	// TODO:: Do your initialization job
	console.log("init() called");

	// add eventListener for keydown
	$(document).bind('keydown', function(e) {
		console.log("Key code : " + e.keyCode);

		switch (e.keyCode) {
		case 37: // LEFT arrow
			alert("hola");
			break;
		case 38: // UP arrow
			break;
		case 39: // RIGHT arrow
			break;
		case 40: // DOWN arrow
			break;
		case 13: // OK button
			break;
		case 10009: // RETURN button
			break;
		case 10182:
			tizen.application.getCurrentApplication().exit();
			break;
		default:
			console.log("Key code : " + e.keyCode);
			break;
		}
	});

	getAllMedia(loadHome);
};

// window.onload can work without <body onload="">
window.onload = init;