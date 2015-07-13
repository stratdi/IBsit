function drawGrid() {

}

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
			homeGrid(response.data.medias);
		},
		error : function(error) {
			console.log('Uh Oh!' + JSON.stringify(error, null, 2));
		}
	});
}

function homeGrid(medias) {
	var grid = "<div class='demo-grid-1 mdl-grid'>";

	for (var i = 0; i < medias.length; i++) {

		console.log(medias[i]);

		var cell = "<div class='mdl-cell mdl-cell--3-col'>\n"
				+ "<div class='mdl-card mdl-shadow--2dp demo-card-image' style='background: url(http://recerca-ltim.uib.es/~atb/res/media/"
				+ medias[i].id + "/icon.jpg) center/cover;'>\n"
				+ "<div class='mdl-card__title mdl-card--expand'></div>\n"
				+ "<div class='mdl-card__actions'>\n"
				+ "<span class='demo-card-image__small'>" + medias[i].island
				+ "</span>" + "<span class='demo-card-image__filename'>"
				+ medias[i].name + "</span>" + "</div></div></div>";

		grid += cell;
		// console.log(cell);
	}

	grid += "</div>";

	$(".page-content").empty().append(grid);
}