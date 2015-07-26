/**
 * Función que devuelve todo el contenido media de la base de datos de ATB
 */
function getAllMedia() {
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

			// console.log(response.data.tags);
			console.log('Success!');
			total_medias = response.data.medias.length;
			homeGrid(response.data.medias);
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