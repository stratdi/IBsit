var startTime;
var checkTime;

// Initialize function
var init = function() {
	// TODO:: Do your initialization job
	console.log("init() called");

	// add eventListener for keydown
	document.addEventListener('keydown', function(e) {
		switch (e.keyCode) {
		case 37: // LEFT arrow
			alert("hola");
			break;
		case 38: // UP arrow
			break;
		case 39: // RIGHT arrow
			break;
		case 40: // DOWN arrow
			break;
		case 13: // OK button
			break;
		case 10009: // RETURN button
			break;
		case 10182:
			tizen.application.getCurrentApplication().exit();
			break;
		default:
			console.log("Key code : " + e.keyCode);
			break;
		}
	});

	getAllMedia();
};

// window.onload can work without <body onload="">
window.onload = init;

function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('divbutton1').innerHTML = "Current time: " + h
			+ ":" + m + ":" + s;
	t = setTimeout(startTime, 250);
}

function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

function getAllMedia() {
	$.ajax({
		url : 'http://recerca-ltim.uib.es/~atb/ajax/getAllTagsMediaR.php',
		async : false,
		contentType : "application/json",
		dataType : 'jsonp',
		data : {
			id : '0'
		},
		success : function(response) {
			//response.data.tags devuelve categorias
			// response.data.medias devuelve todos los media
			console.log(response.data.medias[0]);
			console.log('Success!');
		},
		error : function() {
			console.log('Uh Oh!');
		}
	});
}