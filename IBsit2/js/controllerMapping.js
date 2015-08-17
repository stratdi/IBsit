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
var map_current_pos = 0;
var is_selecting_tab = false;

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
			if (is_selecting_tab) {
				selectTabFromController();
			} else {
				var media = $('[pos-cell="' + grid_current_pos + '"]');
				createMediaPlayer($(media).attr("id-media"));
			}
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
	if (!is_selecting_tab) {
		unselectMedia(grid_current_pos);

		if (grid_current_pos - 1 >= 0) {
			grid_current_pos -= 1;
		}
		selectMedia(grid_current_pos);
	} else {
		var tab = Number($(".tab-selected").attr("tab-pos"));
		if (tab - 1 >= 0) {
			blurTab();
			focusTab(tab - 1);
		}
	}
}

function homeMoveRight() {
	if (!is_selecting_tab) {
		unselectMedia(grid_current_pos);

		if (grid_current_pos + 1 < total_medias) {
			grid_current_pos += 1;
		}

		selectMedia(grid_current_pos);
	} else {
		var tab = Number($(".tab-selected").attr("tab-pos"));
		if (tab + 1 < total_categories) {
			blurTab();
			focusTab(tab + 1);
		}
	}
}

function homeMoveUp() {
	unselectMedia(grid_current_pos);

	if (grid_current_pos - 4 >= 0) {
		grid_current_pos -= 4;
		selectMedia(grid_current_pos);
	} else {
		if ((!$(".mdl-layout__tab-bar").length || !$(".mdl-layout__tab-bar")
				.is(':visible'))
				|| is_selecting_tab) {
			is_selecting_tab = false;
			blurTab();
			$("#search-input").focus();
		} else {
			is_selecting_tab = true;
			focusTab(current_tab);
		}
	}
}

function homeMoveDown() {
	if (!is_selecting_tab) {
		unselectMedia(grid_current_pos);
		if (grid_current_pos + 4 < total_medias) {
			grid_current_pos += 4;
		} else {
			grid_current_pos = total_medias - 1;
		}
	} else {
		is_selecting_tab = false;
		blurTab();
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
		case KEY_KEYBOARD_CANCEL:
			$("#search-input").blur();
			selectMedia(grid_current_pos);
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
			is_selecting_tab = false;
			blurTab();
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
		grid_current_pos = 0;

		if (current_page == Pages.MAP) {
			existsPageContent();
			removeSearchText();
			getAllMedia(loadHome);
		}
		$("#search-input").focus();

		break;
	case 1:
		grid_current_pos = 0;
		current_page = Pages.HOME;
		existsPageContent();
		removeSearchText();
		getAllMedia(loadHome);
		break;
	case 2:
		grid_current_pos = 0;
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
		$(".mdl-layout__content").html("<div class='page-content'></div>");
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
		case KEY_LEFT:
			rewind();
			e.preventDefault();
			break;
		case KEY_FORWARD:
		case KEY_RIGHT:
			forward();
			e.preventDefault();
			break;
		case KEY_EXTRA:
		case KEY_INFO:
			toggleExtraInfoPlayer();
			break;
		case KEY_STOP:
		case KEY_RETURN:
			bindControllerFromMenu();
			stopVideo();
			break;
		case KEY_EXIT:
			tizen.application.getCurrentApplication().exit();
			break;
		}
	});
}

function toggleExtraInfoPlayer() {
	toggleInfoMap();
}

function toggleInfoMap() {
	console.log("toggling");
	if ($("#info-media").css("opacity") == 0) {
		console.log("yes!!");
		$("#info-media").css("opacity", 1);
	} else {
		console.log("oh..!!");

		$("#info-media").css("opacity", 0);
	}
}

function togglePlayerActions() {

}

// #########################################################
// # PANORAMIC CONTROLLER MAP
// #########################################################
function panoramicController() {

	$(document).unbind('keydown');
	$(document).bind('keydown', function(e) {
		switch (e.keyCode) {

		case KEY_LEFT: // LEFT - REWIND
			panoMoveLeft();
			e.preventDefault();
			break;
		case KEY_RIGHT: // RIGHT - FORWARD
			panoMoveRight();
			e.preventDefault();
			break;
		case KEY_UP:
			panoMoveUp();
			e.preventDefault();
			break;
		case KEY_DOWN:
			panoMoveDown();
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
			// $("#player").remove();
			cancelAnimation();
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
