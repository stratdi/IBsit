var camera, scene, renderer;

var isUserInteracting = false, onMouseDownMouseX = 0, onMouseDownMouseY = 0, lon = 0, onMouseDownLon = 0, lat = 0, onMouseDownLat = 0, phi = 0, theta = 0;

var animation, mesh, geometry, material, texture;

var right_mov = true;

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

	right_mov = true;
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

	getMedia(id, function(response) {
		mapLoad(response);
	});
}

function loadPanoMouseEvents() {
	// Eventos de mouse
	$(document).bind('mousedown', onDocumentMouseDown);
	$(document).bind('mousemove', onDocumentMouseMove);
	$(document).bind('mouseup', onDocumentMouseUp);
	$(document).bind('resize', onWindowResize);
}

function unloadPanoMouseEvents() {
	$(document).unbind('mousedown', onDocumentMouseDown);
	$(document).unbind('mousemove', onDocumentMouseMove);
	$(document).unbind('mouseup', onDocumentMouseUp);
	$(document).unbind('resize', onWindowResize);
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
	right_mov = false;
	lon -= 10;
}

function panoMoveRight() {
	right_mov = true;
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

	scene.remove(mesh);
	mesh.material.map.dispose();
	mesh.material.dispose();
	geometry.dispose();

	mesh.material.map.image = null;
	mesh.material.map.sourceFile = null;
	mesh.material.map.mipmaps = null;
	mesh.material.map = null;
	animation = null;

	unloadPanoMouseEvents();

	$("#player").hide();
	$("canvas").hide();
}

function update() {

	if (isUserInteracting === false) {
		if (right_mov) {
			lon += 0.1;
		} else {
			lon -= 0.1;
		}
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