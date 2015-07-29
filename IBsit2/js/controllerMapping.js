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

/**
 * Maps the home (grid with all medias) section.
 */
function homeGridController() {

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

		case 37:
			homeMoveLeft();
			break;
		case 38:
			homeMoveUp();
			e.preventDefault();
			break;
		case 39:
			homeMoveRight();
			break;
		case 40:
			homeMoveDown();
			e.preventDefault();
			break;
		case 13: // OK button
			// reproduceVideo
			videoController();
			var media = $('[pos-cell="' + home_current_pos + '"]');
			createMediaPlayer($(media).attr("id-media"));

			break;
		case 10009: // RETURN button
			// menu
			$(".mdl-layout__drawer").addClass("is-visible");
			menuController();
			break;
		case 10182: // EXIT
			tizen.application.getCurrentApplication().exit();
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
// # MENU CONTROLLER MAP
// #########################################################

function menuController() {
	unselectMenuOption(menu_current_pos);
	menu_current_pos = 1;
	selectMenuOption(menu_current_pos);

	$(document).unbind('keydown');
	$(document).bind('keydown', function(e) {
		console.log("Key code : " + e.keyCode);

		switch (e.keyCode) {

		case 38:
			menuMoveUp();
			e.preventDefault();
			break;
		case 40:
			menuMoveDown();
			e.preventDefault();
			break;
		case 13: // OK button
			// selecciona opcion
			$(".mdl-layout__drawer").removeClass("is-visible");
			setContentFromMenu();
			break;
		case 10009: // RETURN button
			// menu
			$(".mdl-layout__drawer").removeClass("is-visible");
			bindControllerFromMenu();
			break;
		case 10182: // EXIT
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
		break;
	case 1:
		existsPageContent();
		getAllMedia(loadHome);
		break;
	case 2:
		break;
	case 3:
		existsPageContent();
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

		case 412:
		case 37: // LEFT - REWIND
			rewind();
			e.preventDefault();
			break;
		case 417:
		case 39: // RIGHT - FORWARD
			forward();
			e.preventDefault();
			break;
		case 13: // OK button
			// selecciona opcion
			break;
		case 457: // INFO button
			$("#info-media").toggle();
			break;
		case 10009: // RETURN button
			// menu
			bindControllerFromMenu();
			$("#player").remove();
			break;
		case 10182: // EXIT
			tizen.application.getCurrentApplication().exit();
			break;
		default:
			console.log("VIDEO - Key code : " + e.keyCode);
			break;
		}
	});
}