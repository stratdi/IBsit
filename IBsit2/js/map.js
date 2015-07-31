var IBlatitude = 39.8696384;
var IBlongitude = 1.3550432;

// var IBlatitude = 39.534178900000000000;
// var IBlongitude = 2.857710499999939000;
var map;
var markers = [];
var infoMarkers = [];

var islands = [ "Mallorca", "Menorca", "Ibiza", "Formentera" ];

function loadMap() {

	var bigMap = "<div id='map-menu'></div><div id='big-map'></div>";

	$(".mdl-layout__content").empty().append(bigMap);
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
				"<div class='menu-map-option'>" + medias[i].name + "</div>");
	}

	console.log('medias', medias);
	var mapMenu = "";
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
function allMarkers(response) {

	var medias = response.data.medias;
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
			title : "Hola Mundo"
		});

		markers[i] = marker;
		google.maps.event.addListener(marker, 'click', function(event) {
			alert("holaaa!");
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