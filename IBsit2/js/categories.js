var current_tab = 0;
var total_categories;

function loadCategories() {
	current_tab = 0;
	if (!$(".mdl-layout__tab").length) {
		getAllCategories(createTabs);
	} else {
		showTabs();
		getAllTagsMedia($(".mdl-layout__tab").first().attr("category-id"),
				homeGrid);
	}
	categoriesGridController();
}

function createTabs(categories) {
	total_categories = categories.length;
	var tabs = "<div class='mdl-layout__tab-bar mdl-js-ripple-effect' id='categories-tabs'>";

	tabs += "<button class='controller-action' id='left-cat'><i class='material-icons'>&#xE314;</i></button>";

	for ( var c in categories) {
		tabs += "<a href='#fixed-tab-" + c
				+ "' class='mdl-layout__tab' tab-pos='"+c+"' category-id='" + categories[c].id
				+ "'>" + categories[c].name + "</a>";
	}
	tabs += "<button class='controller-action' id='right-cat'><i class='material-icons'>&#xE315;</i></button>";

	tabs += "</div>";
	$("header").append(tabs);
	$(".mdl-layout__tab").first().addClass("is-active");

	$(".mdl-layout__tab").click(
			function() {
				removeSearchText();
				$(".mdl-layout__tab-bar").children(".is-active").removeClass(
						"is-active");
				$(this).addClass("is-active");
				
				is_selecting_tab = false;
				blurTab();
				
				var cat_id = $(this).attr("category-id");
				getAllTagsMedia(cat_id, homeGrid);
				grid_current_pos = 0;
				current_tab = $(this).attr("tab-pos");
				$(this).blur();
			});

	getAllTagsMedia($(".mdl-layout__tab").first().attr("category-id"),
			homeGrid);

	$("#left-cat").click(function() {
		selectLeftTab();
	});

	$("#right-cat").click(function() {
		selectRightTab();
	});
}

function selectLeftTab() {
	if (current_tab != 0) {
		current_tab--;
		selectTab();
	}
}

function selectRightTab() {
	if (current_tab != total_categories - 1) {
		current_tab++;
		selectTab();
	}
}

function selectTabFromController(){
	current_tab = Number($(".tab-selected").attr("tab-pos"));
	is_selecting_tab = false;
	blurTab();
	selectTab();
}

function focusTab(id){
	var tab = $('a[tab-pos="' + id + '"]');

	$(tab).addClass("tab-selected");
}

function blurTab(){
	$(".tab-selected").removeClass("tab-selected");
}

function selectTab() {
	$(".mdl-layout__tab-bar").children(".is-active").removeClass("is-active");
	$(".mdl-layout__tab:eq(" + current_tab + ")").addClass("is-active");
	getAllTagsMedia($(".mdl-layout__tab:eq(" + current_tab + ")").attr(
			"category-id"), homeGrid);
	grid_current_pos = 0;
}

function hideTabs() {
	$(".mdl-layout__tab-bar").hide();
}

function showTabs() {
	$(".mdl-layout__tab-bar").show();
	$(".mdl-layout__tab-bar").children(".is-active").removeClass("is-active");
	$(".mdl-layout__tab").first().addClass("is-active");
}