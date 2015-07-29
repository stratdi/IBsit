/**
 * Función que devuelve todo el contenido media de la base de datos de ATB
 */
function getAllMedia(callback) {
	$.ajax({
		url : 'http://recerca-ltim.uib.es/~atb/ajax/getAllTagsMedia.php',
		async : false,
		contentType : "application/json",
		dataType : 'jsonp',
		data : {
			id : '0'
		},
		success : function(response) {
			// response.data.tags devuelve categorias
			// response.data.medias devuelve todos los media

			callback(response);
		},
		error : function(error) {
			console.log('Uh Oh!' + JSON.stringify(error, null, 2));
		}
	});
}

/**
 * Función que devuelve todos los tags de un contenido media
 * 
 * @param id
 *            Int del media a obtener los tags
 */
function getMediaTags(id) {
	$.ajax({
		url : 'http://recerca-ltim.uib.es/~atb/ajax/getMediaTags.php',
		async : false,
		contentType : "application/json",
		dataType : 'jsonp',
		data : {
			id : id
		},
		success : function(response) {
			console.log('Success!');
			console.log(response);
		},
		error : function(error) {
			console.log('Uh Oh!' + JSON.stringify(error, null, 2));
		}
	});
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
			console.log('Success!');
			callback(response.data.media);
		},
		error : function(error) {
			console.log('Uh Oh!' + JSON.stringify(error, null, 2));
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
			console.log("hola", $(xml));
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
			console.log('Uh Oh!' + JSON.stringify(error, null, 2));
		}
	});

}