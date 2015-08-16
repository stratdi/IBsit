/**
 * Función que devuelve todo el contenido media de la base de datos de ATB dada
 * una categoría. Si el id de categoría es 0, los devuelve todos
 */
function getAllTagsMedia(id, callback) {
	var div_loading_append;

	if (!$(".page-content").length) {
		div_loading_append = $("#map-menu");
	} else {
		div_loading_append = $(".page-content");
	}

	$(div_loading_append)
			.html(
					'<div id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate progress-demo"></div>');
	componentHandler.upgradeDom('MaterialProgress');

	$.ajax({
		url : 'http://recerca-ltim.uib.es/~atb/ajax/getAllTagsMedia.php',
		cache : false,
		contentType : "application/json",
		dataType : 'jsonp',
		data : {
			id : id
		},
		success : function(response) {
			medias = mediaFilter(response.data.medias);
			total_medias = medias.length;
			$(".page-content").empty();
			$("#map-menu").empty();
			callback(medias);
		},
		error : function(error) {
			console.log('Error: ' + JSON.stringify(error, null, 2));
		}
	});
}

function mediaFilter(medias) {
	var mediasFiltered = [];

	for (var i = 0; i < medias.length; i++) {
		if (medias[i].type.toString() != "VIDEO_PANO"
				&& medias[i].type.toString() != "VIDEO_SPHERE") {
			mediasFiltered.push(medias[i]);
		}
	}
	return mediasFiltered;
}

/**
 * Función que devuelve todo el contenido media de la base de datos de ATB
 */
function getAllMedia(callback) {
	getAllTagsMedia(0, callback);
}

/**
 * Función que devuelve la información de un media en concreto
 * 
 * @param id
 *            Int del media a obtener los tags
 */
function getMedia(id, callback) {
	$.ajax({
		url : 'http://recerca-ltim.uib.es/~atb/ajax/getMedia.php',
		contentType : "application/json",
		cache : false,
		dataType : 'jsonp',
		data : {
			id : id
		},
		success : function(response) {
			callback(response.data.media);
		},
		error : function(error) {
			console.log('Error: ' + JSON.stringify(error, null, 2));
		}
	});
}

/**
 * Función que devuelve todas las categorías de la base de datos
 */
function getAllCategories(callback) {
	$.ajax({
		url : 'http://recerca-ltim.uib.es/~atb/ajax/getAllTags.php',
		contentType : "application/json",
		dataType : 'jsonp',
		success : function(response) {
			callback(response.data.tags);
		},
		error : function(error) {
			console.log('Error: ' + JSON.stringify(error, null, 2));
		}
	});
}

function getGpx(id, map) {

	$.ajax({
		crossDomain : true,
		cache : false,
		dataType : "xml",
		url : "http://recerca-ltim.uib.es/~atb/ajax/getGPX.php",
		data : {
			id : id
		},
		success : function(xml) {
			if (xml) {
				var points = [];
				var bounds = new google.maps.LatLngBounds();
				$(xml).find("trkpt").each(function() {
					var lat = $(this).attr("lat");
					var lon = $(this).attr("lon");
					var p = new google.maps.LatLng(lat, lon);
					points.push(p);
					bounds.extend(p);
				});

				var poly = new google.maps.Polyline({
					path : points,
					strokeColor : "#FF00AA",
					strokeOpacity : .7,
					strokeWeight : 4
				});
				poly.setMap(map);
			} else {
				$("#map-tracking").hide();
			}
		},
		error : function(error) {
			console.log('Error: ' + JSON.stringify(error, null, 2));
		}
	});

}