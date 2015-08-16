var IBlatitude = 39.8696384;
var IBlongitude = 1.3550432;

// var IBlatitude = 39.534178900000000000;
// var IBlongitude = 2.857710499999939000;
var map;
var markers = [];
var infoMarkers = [];

var islands = [ "Mallorca", "Menorca", "Ibiza", "Formentera" ];

function loadMap() {

	var bigMap = "<div id='map-menu'></div><div id='big-map' style='opacity: 0;'></div>";

	$(".mdl-layout__content").html(bigMap);
	$(".mdl-layout__header").css("height", "0");
	$(".is-casting-shadow").css("height", "0");

	var myLatlng = new google.maps.LatLng(IBlatitude, IBlongitude);

	var optionsMap = {
		zoom : 8,
		center : myLatlng,
		disableDefaultUI : true,
		draggable : true,
		scrollwheel : false,
	};

	map = new google.maps.Map($("#big-map").get(0), optionsMap);

	google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
		$("#big-map").css("opacity", "1");
		$("#map-loading").hide();
	});

	getAllMedia(allMarkers);
}

function mapMenuLoader(medias) {
	medias.sort(compareIslands);

	var currentIsland;

	for (var i = 0; i < medias.length; i++) {
		if (currentIsland == null || medias[i].island != currentIsland) {
			currentIsland = medias[i].island;
			$("#map-menu").append(
					"<div class='menu-header'>" + currentIsland + "</div>");
		}
		$("#map-menu").append(
				"<div class='menu-map-option' map-pos=" + i + " id-media="
						+ medias[i].id + " media-type=" + medias[i].type + ">"
						+ medias[i].name + "</div>");
	}

	$(".mdl-layout__content")
			.append(
					'<div id="map-loading" class="mdl-progress mdl-js-progress mdl-progress__indeterminate progress-demo" style="z-index:9999;"></div>');
	componentHandler.upgradeDom('MaterialProgress');

	$(".menu-map-option").click(function() {
		unselectMapMedia($(".map-menu-selected").attr("map-pos"));
		selectMapMedia($(this).attr("map-pos"));
	});

	mapController();
}

function compareIslands(a, b) {

	if (a.island == "Mallorca") {
		if (b.island == "Mallorca") {
			return 0;
		} else {
			return -1;
		}
	}
	if (a.island == "Menorca") {
		if (b.island == "Mallorca") {
			return 1;
		} else if (b.island == "Menorca") {
			return 0;
		} else {
			return -1;
		}
	}

	if (a.island == "Ibiza") {
		if (b.island == "Mallorca" || b.island == "Menorca") {
			return 1;
		} else if (b.island == "Ibiza") {
			return 0;
		} else {
			return -1;
		}
	}

	if (a.island == "Formentera") {
		if (b.island == "Formentera") {
			return 0;
		} else {
			return 1;
		}
	}
}

// Markers functions
function allMarkers(medias) {

	var medias = medias;
	var media;
	var myLatlng;

	mapMenuLoader(medias);

	for (var i = 0; i < medias.length; i++) {
		media = medias[i];
		myLatlng = new google.maps.LatLng(media.latitude, media.longitude);

		var marker = new google.maps.Marker({
			position : myLatlng,
			map : map,
			animation : google.maps.Animation.DROP,
			title : medias[i].name,
			id : media.id
		});
		markers[i] = marker;
		google.maps.event.addListener(marker, 'click', function(event) {
			createMediaPlayer(this.id);
		});

		infoMarkers[i] = setInfoMarker(marker, map, media);
	}
}

function setInfoMarker(marker, map, media) {
	var contentString = '<div class="content">'
			+ '<img class="map-img" src="http://recerca-ltim.uib.es/~atb/res/media/'
			+ media.id + '/icon.jpg"></div>' + '<div id="siteNotice">'
			+ '</div>' + '<h4 id="firstHeading" class="firstHeading">'
			+ media.name + '</h4>'
			+ '<p id="secondHeading" class="secondHeading">' + media.island
			+ '</p>' + '</div>';

	var infowindow = new google.maps.InfoWindow({
		content : contentString
	});

	google.maps.event.addListener(marker, 'mouseover', function() {
		closeAllMarkers();
		infowindow.open(map, marker);
	});

	return infowindow;
}

function closeAllMarkers() {
	for (var i = 0; i < infoMarkers.length; i++) {
		infoMarkers[i].close();
	}
}

function selectMapMedia(id) {
	var div = $('[map-pos="' + id + '"]');

	$(div).removeClass("menu-map-option").addClass("map-menu-selected");
	closeAllMarkers();
	infoMarkers[id].open(map, markers[id]);
	mapOptionVisible(div);
}

function unselectMapMedia(id) {
	var div = $(".map-menu-selected");
	$(div).removeClass("map-menu-selected").addClass("menu-map-option");
}

function mapOptionVisible(div) {

	if (!$(div).visible()) {
		if (map_current_pos == 0) {
			$("#map-menu").scrollTo($(".menu-header").get(0), 0);
		} else {
			$("#map-menu").scrollTo($(div), 0);
		}
	}
}