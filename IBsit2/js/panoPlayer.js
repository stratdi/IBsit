var camera, scene, renderer;

var isUserInteracting = false, onMouseDownMouseX = 0, onMouseDownMouseY = 0, lon = 0, onMouseDownLon = 0, lat = 0, onMouseDownLat = 0, phi = 0, theta = 0;

var animation, mesh, geometry, material, texture;

function initThree() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth
			/ window.innerHeight, 1, 1100);
	camera.target = new THREE.Vector3(0, 0, 0);

	geometry = new THREE.SphereGeometry(500, 60, 40);
	geometry.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	materialInit = new THREE.MeshBasicMaterial();

	mesh = new THREE.Mesh(geometry, materialInit);

	scene.add(mesh);

	var container = document.getElementById('player');

	container.appendChild(renderer.domElement);

}

function loadPanoImage(id) {
	if (!scene) {
		initThree();
	}

	$("#video").hide();
	$(".video-controls").hide();
	$("canvas").show();
	componentHandler.upgradeDom('MaterialSpinner');

	THREE.ImageUtils.crossOrigin = 'anonymous';

	var url = url_media_pano.replace("{id}", id);

	mesh.material.map = THREE.ImageUtils.loadTexture(url, null, function() {
		$("#player-loading").hide();
	});


	mesh.material.needsUpdate = true;
	loadPanoMouseEvents();
}

function loadPanoMouseEvents() {
	// Eventos de mouse
	document.addEventListener('mousedown', onDocumentMouseDown, false);
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('mouseup', onDocumentMouseUp, false);

	document.addEventListener('dragover', function(event) {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'copy';
	}, false);

	document.addEventListener('dragenter', function(event) {
		document.body.style.opacity = 0.5;
	}, false);

	document.addEventListener('dragleave', function(event) {
		document.body.style.opacity = 1;
	}, false);

	document.addEventListener('drop', function(event) {
		event.preventDefault();
		var reader = new FileReader();
		reader.addEventListener('load', function(event) {
			material.map.image.src = event.target.result;
			material.map.needsUpdate = true;

		}, false);
		reader.readAsDataURL(event.dataTransfer.files[0]);
		document.body.style.opacity = 1;

	}, false);
	window.addEventListener('resize', onWindowResize, false);
}

function unloadPanoMouseEvents(){
	$(document).unbind('mousedown');
	$(document).unbind('mousemove');
	$(document).unbind('mouseup');
	$(document).unbind('dragover');
	$(document).unbind('dragenter');
	$(document).unbind('dragleave');
	$(document).unbind('drop');
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseDown(event) {
	event.preventDefault();
	isUserInteracting = true;
	onPointerDownPointerX = event.clientX;
	onPointerDownPointerY = event.clientY;
	onPointerDownLon = lon;
	onPointerDownLat = lat;
}

function panoMoveLeft() {
	lon -= 10;
}

function panoMoveRight() {
	lon += 10;
}

function panoMoveUp() {
	lat += 10;
}

function panoMoveDown() {
	lat -= 10;
}

function onDocumentMouseMove(event) {
	if (isUserInteracting === true) {
		lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
		lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
	}
}

function onDocumentMouseUp(event) {
	isUserInteracting = false;
}

function animate() {
	animation = requestAnimationFrame(animate);
	update();
}

function cancelAnimation() {

	cancelAnimationFrame(animation);

	mesh.material.map.dispose();
	mesh.material.dispose();
	geometry.dispose();

//	mesh.material.map.image.src = null;
	mesh.material.map.image = null;
	mesh.material.map.sourceFile = null;
	mesh.material.map.mipmaps = null;
	mesh.material.map = null;

	unloadPanoMouseEvents();

	$("#player").hide();
	$("canvas").hide();
}

function update() {

	if (isUserInteracting === false) {
		lon += 0.1;
	}

	lat = Math.max(-85, Math.min(85, lat));
	phi = THREE.Math.degToRad(90 - lat);
	theta = THREE.Math.degToRad(lon);

	camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
	camera.target.y = 500 * Math.cos(phi);
	camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);

	camera.lookAt(camera.target);

	renderer.render(scene, camera);
}