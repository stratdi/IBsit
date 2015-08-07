var medias;
var total_medias;

var init = function() {

	if (typeof tizen != 'undefined') {
		tizen.tvinputdevice.registerKey('MediaPlayPause');
		tizen.tvinputdevice.registerKey('MediaRewind');
		tizen.tvinputdevice.registerKey('MediaFastForward');
		tizen.tvinputdevice.registerKey('MediaPlay');
		tizen.tvinputdevice.registerKey('MediaPause');
		tizen.tvinputdevice.registerKey('MediaStop');

		tizen.tvinputdevice.registerKey('Menu');
		tizen.tvinputdevice.registerKey('Info');

		tizen.tvinputdevice.registerKey('ColorF0Red');
		tizen.tvinputdevice.registerKey('ColorF3Blue');
	}

	$("#search-input").focus(function() {
		searchController();
	});

	$("#search-input").blur(function() {
		bindControllerFromMenu();
	});

	getAllMedia(loadHome);

	$(".mdl-navigation__link").click(function() {
		menu_current_pos = $(this).attr("menu-option");
		setContentFromMenu();
		$(".mdl-layout__drawer").removeClass("is-visible");
	});

	// FIXME change to other place
	$(".mdl-layout__drawer-button").click(function() {
		menuController();
	});

	// FIXME change to other place
	$(".mdl-layout__obfuscator").click(function() {
		bindControllerFromMenu();
	});
};

// window.onload can work without <body onload="">
window.onload = init;
