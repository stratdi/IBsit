var id_current_media;
var url_media_video = "http://recerca-ltim.uib.es/~atb/res/media/{id}/media.mp4";
var url_media_pano = "http://recerca-ltim.uib.es/~atb/res/media/{id}/media.jpg";

var MediaTypes = {
	VIDEO : "VIDEO",
	VIDEO_PANO : "VIDEO_PANO",
	VIDEO_SPHERE : "VIDEO_SPHERE",
	PANORAMA : "PANORAMA",
	PANORAMA_SPHERE : "PANORAMA_SPHERE"
}

function showPlayer() {
	$("#player").show();
}

function hidePlayer() {
	$("#player").hide();
}

function createMediaPlayer(id) {
	id_current_media = id;

	showPlayer();

	var media = $('[id-media="' + id + '"]');
	var type = $(media).attr("media-type");

	switch (type) {
	case MediaTypes.VIDEO:
		loadVideo(id);
		break;

	case MediaTypes.VIDEO_PANO:
	case MediaTypes.VIDEO_SPHERE:
		// Not supported in TV
		break;

	case MediaTypes.PANORAMA:
	case MediaTypes.PANORAMA_SPHERE:
		$("#player-loading").show();
		panoramicController();
		loadPano(id);
		break;

	default:
		break;
	}
}

// VIDEO PLAYER
function loadVideo(id) {
	$("video").show();
	$("#player-loading").show();
	$("video").get(0).src = url_media_video.replace("{id}", id);
	getMedia(id, function(response) {
		mapLoad(response);
	});
}

function stopVideo() {
	$('video').get(0).pause();
	$('video').get(0).src = '';
	$('video').children('source').prop('src', '');
	$("#progress-bar").val(0);
	hidePlayer();
}

function loadPano(id) {
	loadPanoImage(id);
	animate();
}

function stopPano(){
	
}

function trackingLoad(response) {

	var myLatlng = new google.maps.LatLng(response.latitude, response.longitude);

	var optionsMap = {
		zoom : 9,
		center : myLatlng,
		disableDefaultUI : true,
		draggable : false,
		scrollwheel : false,
	};

	var map = new google.maps.Map($("#map-tracking").get(0), optionsMap);

	getGpx(id_current_media, map);
}

function mapLoad(response) {

	var myLatlng = new google.maps.LatLng(response.latitude, response.longitude);

	var optionsMap = {
		zoom : 10,
		center : myLatlng,
		disableDefaultUI : true,
		draggable : false,
		scrollwheel : false,
	};

	var map = new google.maps.Map($("#map-position").get(0), optionsMap);
	// google.maps.event.trigger(map, 'resize');

	var marker = new google.maps.Marker({
		position : myLatlng,
		map : map,
		animation : google.maps.Animation.DROP,
		title : ""
	});

	trackingLoad(response);
}

function progressBarEvents() {
	componentHandler.upgradeDom('MaterialSpinner');

	$("video").on(
			"timeupdate",
			function() {
				var percentage = Math.floor((100 / $("video")[0].duration)
						* $("video")[0].currentTime);
				$("#progress-bar").attr("value", percentage);
			});

	$("video").on("waiting", function() {
		$("#player-loading").show();
	});

	$("video").on("canplaythrough", function() {
		$("#player-loading").hide();
	});

	$("video").on("ended", function() {
		$("#progress-bar").attr("value", 100);
		$("#pause").hide();
		$("#replay").show();
	});
}

function playerActions() {

	$("#play").hide();
	$("#replay").hide();

	$("#play").click(function() {
		$("video")[0].play();
		$(this).hide();
		$("#pause").show();
	});

	$("#replay").click(function() {
		$("video")[0].currentTime = 0;
		$("video")[0].play();
		$(this).hide();
		$("#pause").show();
	});

	$("#pause").click(function() {
		$("video")[0].pause();
		$(this).hide();
		$("#play").show();
	});

	$("#rewind").click(function() {
		rewind();
	});

	$("#forward").click(function() {
		forward();
	});

	$(".video-controls").hide();

	var i = null;
	$("body").mousemove(function() {
		
		console.log("seerr",$('video').get(0).src);
		if ($("video").get(0).currentSrc) {
			clearTimeout(i);
			$(".video-controls").fadeIn("fast");
			i = setTimeout('$(".video-controls").fadeOut("fast");', 2000);
		}
		
	});

	$("#info-media").css("opacity", "0");
}

function rewind() {
	$("video")[0].pause();
	$("video")[0].currentTime = $("video")[0].currentTime - 5;
	$("video")[0].play();
	$("#play").hide();
	$("#replay").hide();
	$("#pause").show();
}

function forward() {
	$("video")[0].pause();
	$("video")[0].currentTime = $("video")[0].currentTime + 5;
	$("video")[0].play();
	$("#play").hide();
	$("#replay").hide();
	$("#pause").show();
}

// PANORAMA SPHERE PLAYER
