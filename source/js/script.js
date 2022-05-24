import * as THREE from 'three';
import * as dat from 'dat.gui';

const gui = new dat.GUI()
const world = {
    plane: {
        width: 10,
        height: 10
    }
}
gui.add(world.plane, 'width', 1, 500)
    .onChange(() => {
        planeMesh.geometry.dispose()
        planeMesh.geometry =  new THREE.PlaneGeometry(world.plane.width, world.plane.height, 10, 10);

        const { array } = planeMesh.geometry.attributes.position;
        for (let i = 0; i < array.length; i += 3) {
            const x  = array[i];
            const y  = array[i + 1 ];
            const z  = array[i + 2 ];

            array[i + 2] = z + Math.random()
        }
    })

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

document.body.appendChild( renderer.domElement );

camera.position.z = 5

const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    flatShading: THREE.FlatShading
})
const planeMesh =   new THREE.Mesh(
    planeGeometry, planeMaterial)
 scene.add(planeMesh)

const { array } = planeMesh.geometry.attributes.position;


for (let i = 0; i < array.length; i += 3) {
    const x  = array[i];
    const y  = array[i + 1 ];
    const z  = array[i + 2 ];

    array[i + 2] = z + Math.random()
}


const light = new THREE.DirectionalLight(
    0xffffff, 1
)

light.position.set(0, 0, 1)
scene.add(light)

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)

/*    planeMesh.rotation.x += 0.01*/
}
animate()
