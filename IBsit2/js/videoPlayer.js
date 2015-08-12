var id_current_media;

var MediaTypes = {
	VIDEO : "VIDEO",
	VIDEO_PANO : "VIDEO_PANO",
	VIDEO_SPHERE : "VIDEO_SPHERE",
	PANORAMA : "PANORAMA",
	PANORAMA_SPHERE : "PANORAMA_SPHERE"
}

function createMediaPlayer(id) {
	id_current_media = id;
	var player = "<div id='player'>";
	player += "<div id='player-loading'class='mdl-spinner mdl-js-spinner is-active'></div>";

	var media = $('[id-media="' + id + '"]');

	var type = $(media).attr("media-type");
	switch (type) {
	case MediaTypes.VIDEO:
		player += videoPlayer(id) + "</div>";
		$("body").append(player);

		playerActions();
		progressBarEvents();

		getMedia(id, function(response) {
			mediaInfo(response);
		});

		break;
	case MediaTypes.VIDEO_PANO:
	case MediaTypes.VIDEO_SPHERE:
		// Not supported in TV
		break;
	case MediaTypes.PANORAMA:
	case MediaTypes.PANORAMA_SPHERE:
		$("body").append(player+ "</div>");
		$("#player-loading").show();
		panoramicController();
		initThree(id);
		animate();
		break;
	default:
		break;
	}	
}

// VIDEO PLAYER
function videoPlayer(id) {
	var video = "<video id='video' src='http://recerca-ltim.uib.es/~atb/res/media/"
			+ id + "/media.mp4' autoplay></video>";
	var controls = "<div class='video-controls'>"
			+ "<progress id='progress-bar' min='0' max='100' value='0'></progress>"
			+ "<button id='rewind' class='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'>"
			+ "<i class='material-icons'>&#xE020;</i></button>"
			+ "<button id='play' class='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'>"
			+ "<i class='material-icons'>&#xE037;</i></button>"
			+ "<button id='pause' class='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'>"
			+ "<i class='material-icons'>&#xE034;</i></button>"
			+ "<button id='replay' class='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'>"
			+ "<i class='material-icons'>&#xE042;</i></button>"
			+ "<button id='forward' class='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored'>"
			+ "<i class='material-icons'>&#xE01F;</i></button></div>";

	var info = "<div id='info-media'><div id='map-position'></div><div id='map-tracking'></div></div>";

	video += controls;
	video += info;

	return video;
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
	//google.maps.event.trigger(map, 'resize');

	var marker = new google.maps.Marker({
		position : myLatlng,
		map : map,
		animation : google.maps.Animation.DROP,
		title : "Hola Mundo"
	});

	trackingLoad(response);
}

function mediaInfo(response) {

	mapLoad(response);
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
		clearTimeout(i);
		$(".video-controls").fadeIn("fast");
		i = setTimeout('$(".video-controls").fadeOut("fast");', 2000);
	});

	$("#info-media").css("opacity","0");
}

function rewind() {
	$("video")[0].pause();
	$("video")[0].currentTime = $("video")[0].currentTime - 5;
	$("video")[0].play();
	$("#play").hide();
	$("#pause").show();
}

function forward() {
	$("video")[0].pause();
	$("video")[0].currentTime = $("video")[0].currentTime + 5;
	$("video")[0].play();
	$("#play").hide();
	$("#pause").show();
}

// PANORAMA SPHERE PLAYER
