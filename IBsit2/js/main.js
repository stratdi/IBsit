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
		tizen.tvinputdevice.registerKey('Extra');

		tizen.tvinputdevice.registerKey('Menu');
		tizen.tvinputdevice.registerKey('Info');

		tizen.tvinputdevice.registerKey('ColorF0Red');
		tizen.tvinputdevice.registerKey('ColorF3Blue');
	}

	$("#search-input").focus(function() {
		searchController();
		unselectMedia(grid_current_pos);
	});

	$("#search-input").blur(function() {
		bindControllerFromMenu();
		selectMedia(grid_current_pos);
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
	
	playerActions();
	progressBarEvents();
	
	hidePlayer();
};

// window.onload can work without <body onload="">
window.onload = init;
