var total_medias;

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

function homeGrid(medias) {

	var grid = "<div class='demo-grid-1 mdl-grid'>";

	for (var i = 0; i < medias.length; i++) {

		console.log(medias[i]);

		// medias[i].type.toString() != "VIDEO_PANO" &&
		// medias[i].type.toString() != "VIDEO_SPHERE"
		if (true) {
			var cell = "<div class='mdl-cell mdl-cell--3-col' pos-cell="
					+ i
					+ " id-media='"
					+ medias[i].id
					+ "'>\n"
					+ "<div class='mdl-card mdl-shadow--2dp demo-card-image' "
					+ "style='background: url(http://recerca-ltim.uib.es/~atb/res/media/"
					+ medias[i].id
					+ "/icon.jpg) center/cover;'>\n"
					+ "<div class='mdl-card__title mdl-card--expand'></div>\n"
					+ "<div class='mdl-card__actions meta'>\n"
					+ "<div class='minilogo'><i class='material-icons'>&#xE532;</i></div>"
					+ "<div class='demo-card-image__small'><strong>"
					+ medias[i].location + "</strong></div>"
					+ "<div class='demo-card-image__filename'>"
					+ medias[i].name + "</div>" + "</div></div></div>";

			grid += cell;
		}
	}

	grid += "</div>";

	$(".page-content").empty().append(grid);
	homeScroll();
	homeGridController();

}

function homeScroll() {

	var padding = $(".mdl-layout__drawer-button").width();

	var down = "<div id='down' class='scroll'>"
			+ "<button class='mdl-button mdl-js-button mdl-button--fab'>"
			+ "<i class='material-icons'>&#xE313;</i></button></div>";

	var up = "<div id='up' class='scroll'>"
			+ "<button class='mdl-button mdl-js-button mdl-button--fab'>"
			+ "<i class='material-icons'>&#xE316;</i>" + "</button></div>";
	$(".page-content").append(up);
	$(".page-content").append(down);

	$("#up").click(function() {
		var y = $("main").scrollTop();
		$("main").scrollTop(y - 100);
	});

	$("#down").click(function() {
		var y = $("main").scrollTop();
		$("main").scrollTop(y + 100);
	});

	$(".scroll").css("padding-left", padding / 2);
}

function selectMedia(id) {
	var div = $('[pos-cell="' + id + '"]').find(".mdl-card__actions");

	$(div).removeClass("mdl-card__actions").addClass("cell-selected");
	visible(div);
}

function visible(div){
	if (!$(div).parent().parent().visible()){
		$("main").scrollTo($(div).parent().parent(), 0);
	}
}

function unselectMedia(id) {
	var div = $(".cell-selected");
	$(div).removeClass("cell-selected").addClass("mdl-card__actions");
}