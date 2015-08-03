// Initialize function
var init = function() {
	// TODO:: Do your initialization job
	console.log("init() called");

	if (typeof tizen != 'undefined') {
		tizen.tvinputdevice.registerKey('MediaPlayPause');
		tizen.tvinputdevice.registerKey('MediaRewind');
		tizen.tvinputdevice.registerKey('MediaFastForward');
		tizen.tvinputdevice.registerKey('MediaPlay');
		tizen.tvinputdevice.registerKey('MediaPause');
		tizen.tvinputdevice.registerKey('MediaStop');

		tizen.tvinputdevice.registerKey('Menu');
		tizen.tvinputdevice.registerKey('Info');
	}
	getAllMedia(loadHome);
};

// window.onload can work without <body onload="">
window.onload = init;