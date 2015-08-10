var Pages = {
	HOME : "Home",
	CATEGORIES : "Categories",
	MAP : "Map"
};

var current_page = Pages.HOME;

// #########################################################
// # HOME CONTROLLER MAP
// #########################################################
var grid_current_pos = 0;
var menu_current_pos = 1;
var map_current_pos = -1;

/**
 * Maps the home (grid with all medias) section.
 */
function homeGridController() {
	current_page = Pages.HOME;
	unselectMenuOption(menu_current_pos);
	menu_current_pos = 1;
	selectMenuOption(menu_current_pos);
	gridController();
}

function categoriesGridController() {
	current_page = Pages.CATEGORIES;
	unselectMenuOption(menu_current_pos);
	menu_current_pos = 2;
	selectMenuOption(menu_current_pos);
	gridController();
}

function gridController() {
	grid_current_pos = 0;

	$(document).unbind('keydown');
	$(document).bind('keydown', function(e) {
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
			videoController();
			var media = $('[pos-cell="' + grid_current_pos + '"]');
			createMediaPlayer($(media).attr("id-media"));
			break;
		case KEY_MENU:
		case KEY_RETURN: // RETURN button
			// menu
			$(".mdl-layout__drawer").addClass("is-visible");
			menuController();
			break;
		case KEY_RED:
			if (current_page == Pages.CATEGORIES) {
				selectLeftTab();
			}
			break;
		case KEY_BLUE:
			if (current_page == Pages.CATEGORIES) {
				selectRightTab();
			}
			break;
		case KEY_EXIT: // EXIT
			tizen.application.getCurrentApplication().exit();
			break;
		}
	});
}

function homeMoveLeft() {
	unselectMedia(grid_current_pos);

	if (grid_current_pos - 1 >= 0) {
		grid_current_pos -= 1;
	}
	selectMedia(grid_current_pos);
}

function homeMoveRight() {
	unselectMedia(grid_current_pos);

	if (grid_current_pos + 1 < total_medias) {
		grid_current_pos += 1;
	}

	selectMedia(grid_current_pos);
}

function homeMoveUp() {
	unselectMedia(grid_current_pos);

	if (grid_current_pos - 4 >= 0) {
		grid_current_pos -= 4;
	} else {
		grid_current_pos = 0;
	}

	selectMedia(grid_current_pos);
}

function homeMoveDown() {
	unselectMedia(grid_current_pos);

	if (grid_current_pos + 4 < total_medias) {
		grid_current_pos += 4;
	} else {
		grid_current_pos = total_medias - 1;
	}

	selectMedia(grid_current_pos);
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
		case KEY_MENU:
		case KEY_RETURN: // RETURN button
			// menu
			$(".mdl-layout__drawer").removeClass("is-visible");
			bindControllerFromMenu();
			break;
		case KEY_EXIT: // EXIT
			tizen.application.getCurrentApplication().exit();
			break;
		}
	});
}

function setContentFromMenu() {
	menu_current_pos = Number(menu_current_pos);
	switch (menu_current_pos) {
	case 0:
		if (current_page == Pages.MAP) {
			existsPageContent();
			removeSearchText();
			getAllMedia(loadHome);
		}
		$("#search-input").focus();

		break;
	case 1:
		current_page = Pages.HOME;
		existsPageContent();
		removeSearchText();
		getAllMedia(loadHome);
		break;
	case 2:
		current_page = Pages.CATEGORIES;
		existsPageContent();
		removeSearchText();
		loadCategories();
		break;
	case 3:
		current_page = Pages.MAP;
		existsPageContent();
		$(".mdl-layout__header-row").hide();
		loadMap();
		break;
	}
}

function removeSearchText() {
	$(".mdl-layout__header-row").show();
	$(".mdl-layout__header").css("height", "");
	$("#search-input").val("");
	$(".textfield-search").removeClass("is-dirty");
}

function existsPageContent() {
	if (!$(".page-content").length) {
		$(".mdl-layout__content").empty().append(
				"<div class='page-content'></div>");
	}
}

function menuMoveUp() {
	unselectMenuOption(menu_current_pos);
	if (menu_current_pos - 1 >= 0) {
		menu_current_pos--;
	}
	selectMenuOption(menu_current_pos);
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
	case Pages.CATEGORIES:
		categoriesGridController();
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
			break;
		case KEY_INFO: // INFO button
			if ($("#info-media").css("opacity") == 0) {
				$("#info-media").css("opacity", 1);
			} else {
				$("#info-media").css("opacity", 0);
			}
			break;
		case KEY_STOP:
		case KEY_RETURN: // RETURN button
			// menu
			bindControllerFromMenu();
	        $('video').get(0).pause();
			$("#player").remove();
			break;
		case KEY_EXIT: // EXIT
			tizen.application.getCurrentApplication().exit();
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
		case KEY_MENU:
		case KEY_RETURN: // RETURN button
			// menu
			$(".mdl-layout__drawer").addClass("is-visible");
			menuController();
			break;
		case KEY_EXIT: // EXIT
			tizen.application.getCurrentApplication().exit();
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
}

function mapMoveDown() {
	unselectMapMedia(map_current_pos);

	if (map_current_pos + 1 < total_medias) {
		map_current_pos += 1;
	}

	selectMapMedia(map_current_pos);
}
