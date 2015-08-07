/**
 * Función que devuelve todo el contenido media de la base de datos de ATB dada
 * una categoría. Si el id de categoría es 0, los devuelve todos
 */
function getAllTagsMedia(id, callback) {
	$.ajax({
		url : 'http://recerca-ltim.uib.es/~atb/ajax/getAllTagsMedia.php',
		async : false,
		contentType : "application/json",
		dataType : 'jsonp',
		data : {
			id : id
		},
		success : function(response) {
			medias = response.data.medias;
			total_medias = medias.length;
			callback(response);
		},
		error : function(error) {
			console.log('Error: ' + JSON.stringify(error, null, 2));
		}
	});
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
		async : false,
		contentType : "application/json",
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
		async : false,
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
				$("#map-tracking").remove();
			}
		},
		error : function(error) {
			console.log('Error: ' + JSON.stringify(error, null, 2));
		}
	});

}