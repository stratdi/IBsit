/**
 * CUIDADO: esta clase tiene que usarse después de haber cargado la variable
 * medias, ya que se da por hecho que encontraremos allí todos los medias
 * disponibles.
 */

/**
 * Búsqueda de archivos media por nombre, lugar o isla
 */
function search() {
	var search = $("#search-input").val().toLowerCase();
	var result = $.grep(medias, function(el) {
		return el.name.toLowerCase().indexOf(search) > -1
				|| el.location.toLowerCase().indexOf(search) > -1
				|| el.island.toLowerCase().indexOf(search) > -1;
	});
	total_medias = result.length;
	homeGrid(result);
}