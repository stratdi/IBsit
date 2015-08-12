function homeGrid(medias) {

	var grid = "<div class='demo-grid-1 mdl-grid'>";

	if (medias.length != 0) {
		for (var i = 0; i < medias.length; i++) {

			// medias[i].type.toString() != "VIDEO_PANO" &&
			// medias[i].type.toString() != "VIDEO_SPHERE"
			if (true) {
				var cell = "<div class='mdl-cell mdl-cell--3-col' pos-cell="
						+ i
						+ " id-media='"
						+ medias[i].id
						+ "' media-type='"
						+ medias[i].type
						+ "'>\n"
						+ "<div class='mdl-card mdl-shadow--2dp demo-card-image' "
						+ "style='background: url(http://recerca-ltim.uib.es/~atb/res/media/"
						+ medias[i].id
						+ "/icon.jpg) center/cover;'>\n"
						+ "<div class='mdl-card__title mdl-card--expand'></div>\n"
						+ "<div class='mdl-card__actions meta'>\n"
						+ "<div class='minilogo'><i class='material-icons'>"
						+ getMediaIcon(medias[i].type) + "</i></div>"
						+ "<div class='demo-card-image__small'><strong>"
						+ medias[i].location + "</strong></div>"
						+ "<div class='demo-card-image__filename'>"
						+ medias[i].name + "</div>" + "</div></div></div>";

				grid += cell;
			}
		}
	}else{
		grid += "<div class='no-results'><h2>No results found...</h2></div>";
	}

	grid += "</div>";

	$(".page-content").html(grid);
	homeScroll();

	selectMedia(0);

	$(".mdl-cell").click(function() {
		videoController();
		var media = $(this).attr("id-media");
		createMediaPlayer(media);
	});
}

function getMediaIcon(media) {
	var icon;
	switch (media) {
	case MediaTypes.VIDEO:
		icon = "&#xE04B;";
		break;
	case MediaTypes.VIDEO_PANO:
	case MediaTypes.VIDEO_SPHERE:
		// Not supported in TV
		break;
	case MediaTypes.PANORAMA:
		icon = "&#xE432;";
		break;
	case MediaTypes.PANORAMA_SPHERE:
		icon = "&#xE433;";
		break;
	default:
		break;
	}
	return icon;
}

function homeScroll() {

	var padding = $(".mdl-layout__drawer-button").width();

	var down = "<div id='down' class='scroll'>"
			+ "<button class='mdl-button mdl-js-button mdl-button--fab'>"
			+ "<i class='material-icons'>&#xE313;</i></button></div>";

	var up = "<div id='up' class='scroll'>"
			+ "<button class='mdl-button mdl-js-button mdl-button--fab'>"
			+ "<i class='material-icons'>&#xE316;</i>" + "</button></div>";
	$(".page-content").append(up);
	$(".page-content").append(down);

	$("#up").click(function() {
		var y = $("main").scrollTop();
		$("main").scrollTop(y - 100);
	});

	$("#down").click(function() {
		var y = $("main").scrollTop();
		$("main").scrollTop(y + 100);
	});

	$(".scroll").css("padding-left", padding / 2);
	
	var top_distance = $("demo-grid-1").scrollTop();

	if (current_page == Pages.CATEGORIES){
		$("#up").addClass("categories");
	}
	
	$(".scroll").hide();
	var i = null;
	$(".demo-grid-1").mousemove(function() {
		clearTimeout(i);
		$(".scroll").fadeIn("fast");
		i = setTimeout('$(".scroll").fadeOut("fast");', 2000);
	});
}

function selectMedia(id) {
	var div = $('[pos-cell="' + id + '"]').find(".mdl-card__actions");

	$(div).removeClass("mdl-card__actions").addClass("cell-selected");
	visible(div);
}

function visible(div) {
	if (!$(div).parent().parent().visible()) {
		$("main").scrollTo($(div).parent().parent(), 0);
	}
}

function unselectMedia(id) {
	var div = $(".cell-selected");
	$(div).removeClass("cell-selected").addClass("mdl-card__actions");
}

function loadHome(response) {
	hideTabs();
	homeGrid(response.data.medias);
	homeGridController();
}