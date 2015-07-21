var MediaTypes = {
	VIDEO : "VIDEO",
	VIDEO_PANO : "VIDEO_PANO",
	VIDEO_SPHERE : "VIDEO_SPHERE",

	PANORAMA_SPHERE : "PANORAMA_SPHERE"
}

function createMediaPlayer(id) {
	var player = "<div id='player'></div>";

	switch (type) {
	case MediaTypes.VIDEO:
		break;
	case MediaTypes.VIDEO_PANO:
	case MediaTypes.VIDEO_SPHERE:
		// Not supported in TV
		break;
	case MediaTypes.PANORAMA_SPHERE:
		break;
	default:
		break;
	}
}

function videoPlayer(id) {
	var video = "<video id='video' src='"+"'></video>"
}