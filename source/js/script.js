import * as THREE from '../../node_modules/three/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

/*const reference = document.querySelector("#my_canvas");

const renderer = new THREE.WebGLRenderer({
    antialias:true,
    canvas: reference
});*/

const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild( renderer.domElement );

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00})

const mesh = new THREE.Mesh(boxGeometry, material);


scene.add(mesh)

camera.position.z = 5

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01

}
animate()


