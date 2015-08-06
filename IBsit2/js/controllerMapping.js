var Pages = {
	HOME : "Home",
	CATEGORIES : "Categories",
	MAP : "Map"
};

var current_page = Pages.HOME;

// #########################################################
// # HOME CONTROLLER MAP
// #########################################################
var home_current_pos = 0;
var menu_current_pos = 1;
var map_current_pos = 0;

/**
 * Maps the home (grid with all medias) section.
 */
function homeGridController() {

	current_page = Pages.HOME;
	unselectMenuOption(menu_current_pos);
	menu_current_pos = 1;
	selectMenuOption(menu_current_pos);

	// FIXME change to other place
	$(".mdl-layout__drawer-button").click(function() {
		menuController();
	});

	// FIXME change to other place
	$(".mdl-layout__obfuscator").click(function() {
		bindControllerFromMenu();
	});

	$(document).unbind('keydown');
	$(document).bind('keydown', function(e) {
		console.log("Key code : " + e.keyCode);

		switch (e.keyCode) {

		case KEY_LEFT:
			homeMoveLeft();
			break;
		case KEY_UP:
			homeMoveUp();
			e.preventDefault();
			break;
		case KEY_RIGHT:
			homeMoveRight();
			break;
		case KEY_DOWN:
			homeMoveDown();
			e.preventDefault();
			break;
		case KEY_OK: // OK button
			// reproduceVideo
			videoController();
			var media = $('[pos-cell="' + home_current_pos + '"]');
			createMediaPlayer($(media).attr("id-media"));

			break;
		case KEY_RETURN: // RETURN button
			// menu
			$(".mdl-layout__drawer").addClass("is-visible");
			menuController();
			break;
		case KEY_EXIT: // EXIT
			tizen.application.getCurrentApplication().exit();
			break;
		case 65376:
			console.log("jejeje...");
			alert("HOLAAA!");
			break;
		default:
			console.log("Key code : " + e.keyCode);
			break;
		}
	});
}

function homeMoveLeft() {
	unselectMedia(home_current_pos);

	if (home_current_pos - 1 >= 0) {
		home_current_pos -= 1;
	}
	selectMedia(home_current_pos);
}

function homeMoveRight() {
	unselectMedia(home_current_pos);

	if (home_current_pos + 1 < total_medias) {
		home_current_pos += 1;
	}

	selectMedia(home_current_pos);
}

function homeMoveUp() {
	unselectMedia(home_current_pos);

	if (home_current_pos - 4 >= 0) {
		home_current_pos -= 4;
	} else {
		home_current_pos = 0;
	}

	selectMedia(home_current_pos);
}

function homeMoveDown() {
	unselectMedia(home_current_pos);

	if (home_current_pos + 4 < total_medias) {
		home_current_pos += 4;
	} else {
		home_current_pos = total_medias - 1;
	}

	selectMedia(home_current_pos);
}

// #########################################################
// # SEARCH CONTROLLER MAP
// #########################################################
function searchController() {
	$(document).unbind('keydown');
	$(document).bind('keydown', function(e) {
		switch (e.keyCode) {
		case KEY_OK:
		case KEY_KEYBOARD_OK:
			$("#search-input").blur();
			search();
			break;
		}
	});
}

// #########################################################
// # MENU CONTROLLER MAP
// #########################################################

function menuController() {

	$(document).unbind('keydown');
	$(document).bind('keydown', function(e) {
		console.log("Key code : " + e.keyCode);

		switch (e.keyCode) {

		case KEY_UP:
			menuMoveUp();
			e.preventDefault();
			break;
		case KEY_DOWN:
			menuMoveDown();
			e.preventDefault();
			break;
		case KEY_OK: // OK button
			// selecciona opcion
			$(".mdl-layout__drawer").removeClass("is-visible");
			setContentFromMenu();
			break;
		case KEY_RETURN: // RETURN button
			// menu
			$(".mdl-layout__drawer").removeClass("is-visible");
			bindControllerFromMenu();
			break;
		case KEY_EXIT: // EXIT
			tizen.application.getCurrentApplication().exit();
			break;
		default:
			console.log("Key code : " + e.keyCode);
			break;
		}
	});
}

function setContentFromMenu() {
	var optionSelected = Number($(".menu-selected").attr("menu-option"));
	switch (optionSelected) {
	case 0:
		if (current_page == Pages.MAP) {
			existsPageContent();
			$(".mdl-layout__header-row").show();
			$(".mdl-layout__header").css("height", "");
			$("#search-input").val("");
			$(".textfield-search").removeClass("is-dirty");
			getAllMedia(loadHome);
		}
		$("#search-input").focus();

		break;
	case 1:
		existsPageContent();
		$(".mdl-layout__header-row").show();
		$(".mdl-layout__header").css("height", "");
		$("#search-input").val("");
		$(".textfield-search").removeClass("is-dirty");
		getAllMedia(loadHome);
		break;
	case 2:
		break;
	case 3:
		existsPageContent();
		$(".mdl-layout__header-row").hide();
		loadMap();
		break;
	default:
		console.log("jajaja");
		break;
	}
}

function existsPageContent() {
	console.log("papaapa");
	if (!$(".page-content").length) {
		$(".mdl-layout__content").empty().append(
				"<div class='page-content'></div>");
	}
}

function menuMoveUp() {
	console.log("parriba!");
	console.log(menu_current_pos);
	unselectMenuOption(menu_current_pos);
	if (menu_current_pos - 1 >= 0) {
		menu_current_pos--;
	}
	selectMenuOption(menu_current_pos);
	console.log(menu_current_pos);

}

function menuMoveDown() {
	unselectMenuOption(menu_current_pos);
	if (menu_current_pos + 1 <= 3) {
		menu_current_pos++;
	}
	selectMenuOption(menu_current_pos);
}

function selectMenuOption(id) {

	var div = $('a[menu-option="' + id + '"]');
	$(div).removeClass("mdl-navigation__link").addClass("menu-selected");
}

function unselectMenuOption(id) {
	$(".menu-selected").removeClass("menu-selected").addClass(
			"mdl-navigation__link");
}

function bindControllerFromMenu() {
	switch (current_page) {
	case Pages.HOME:
		homeGridController();
		break;

	case Pages.MAP:
		mapController();
		break;
	}
}

// #########################################################
// # VIDEO CONTROLLER MAP
// #########################################################
function videoController() {

	$(document).unbind('keydown');
	$(document).bind('keydown', function(e) {
		console.log("Key code : " + e.keyCode);

		switch (e.keyCode) {

		case KEY_REWIND:
		case KEY_LEFT: // LEFT - REWIND
			rewind();
			e.preventDefault();
			break;
		case KEY_FORWARD:
		case KEY_RIGHT: // RIGHT - FORWARD
			forward();
			e.preventDefault();
			break;
		case KEY_OK: // OK button
			// selecciona opcion
			break;
		case 457: // INFO button
			if ($("#info-media").css("opacity") == 0) {
				$("#info-media").css("opacity", 1);
			} else {
				$("#info-media").css("opacity", 0);
			}
			break;
		case KEY_RETURN: // RETURN button
			// menu
			bindControllerFromMenu();
			$("#player").remove();
			break;
		case KEY_EXIT: // EXIT
			tizen.application.getCurrentApplication().exit();
			break;
		default:
			console.log("VIDEO - Key code : " + e.keyCode);
			break;
		}
	});
}

// #########################################################
// # GOOGLE MAP CONTROLLER MAP
// #########################################################

function mapController() {
	current_page = Pages.MAP;

	unselectMenuOption(menu_current_pos);
	menu_current_pos = 3;
	selectMenuOption(menu_current_pos);

	$(document).unbind('keydown');
	$(document).bind('keydown', function(e) {
		console.log("Key code : " + e.keyCode);

		switch (e.keyCode) {

		case KEY_UP:
			mapMoveUp();
			e.preventDefault();
			break;
		case KEY_DOWN:
			mapMoveDown();
			e.preventDefault();
			break;
		case KEY_OK: // OK button
			// selecciona opcion
			videoController();
			var media = $('[map-pos="' + map_current_pos + '"]');
			createMediaPlayer($(media).attr("id-media"));
			break;
		case KEY_RETURN: // RETURN button
			// menu
			$(".mdl-layout__drawer").addClass("is-visible");
			menuController();
			break;
		case KEY_EXIT: // EXIT
			tizen.application.getCurrentApplication().exit();
			break;
		default:
			console.log("Key code : " + e.keyCode);
			break;
		}
	});
}

function mapMoveUp() {
	unselectMapMedia(map_current_pos);

	if (map_current_pos - 1 >= 0) {
		map_current_pos -= 1;
	}

	selectMapMedia(map_current_pos);
	console.log("map ", map_current_pos);
}

function mapMoveDown() {
	unselectMapMedia(map_current_pos);

	if (map_current_pos + 1 < total_medias) {
		map_current_pos += 1;
	}

	selectMapMedia(map_current_pos);
	console.log("map ", map_current_pos);

}
