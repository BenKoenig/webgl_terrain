import * as THREE from 'three';
import * as gsap from 'gsap';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js' 


const gui = new dat.GUI()
const world = {
    plane: {
        width: 10,
        height: 10,
        widthSegments: 10,
        heightSegments: 10
    }
}

function generatePlane() {
    planeMesh.geometry.dispose()
    planeMesh.geometry = new THREE.PlaneGeometry(
        world.plane.width,
        world.plane.height,
        world.plane.widthSegments,
        world.plane.heightSegments);

    const {array} = planeMesh.geometry.attributes.position;
    for (let i = 0; i < array.length; i += 3) {
        const x = array[i];
        const y = array[i + 1];
        const z = array[i + 2];

        array[i + 2] = z + Math.random()
    }
}

gui.add(world.plane, 'width', 1, 20)
    .onChange(generatePlane)

gui.add(world.plane, 'height', 1, 20)
    .onChange(generatePlane)

gui.add(world.plane, 'widthSegments', 1, 20)
    .onChange(generatePlane)

gui.add(world.plane, 'heightSegments', 1, 20)
    .onChange(generatePlane)

const raycaster = new THREE.Raycaster
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75, 
    innerWidth / innerHeight, 
    0.1, 
    1000);

const renderer = new THREE.WebGLRenderer()
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

document.body.appendChild(renderer.domElement);


const controls = new OrbitControls( camera, renderer.domElement );


camera.position.z = 5

const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
const planeMaterial = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    flatShading: THREE.FlatShading,
    vertexColors: true
})

const planeMesh = new THREE.Mesh(
    planeGeometry, planeMaterial)
scene.add(planeMesh)

const {array} = planeMesh.geometry.attributes.position;


for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i + 2] = z + Math.random()
}



const colors = [];
for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
    colors.push(0, 0.19, 0.4)
}



planeMesh.geometry.setAttribute('color',
    new THREE.BufferAttribute(new Float32Array(colors), 3))




const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 0, 1)
scene.add(light)

const backLight = new THREE.DirectionalLight(0xffffff, 1)
backLight.position.set(0, 0, -1)
scene.add(backLight)


const mouse = {
    x: undefined,
    y: undefined
}

function animate() {
    requestAnimationFrame(animate)
    controls.update();

    renderer.render(scene, camera)


    /*    planeMesh.rotation.x += 0.01*/
}

animate()


addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1
    mouse.y = -(e.clientY / innerHeight) * 2 + 1

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(planeMesh)

    if(intersects.length > 0) {


        const { color } = intersects[0].object.geometry.attributes

        // verticle 1 
        color.setX(intersects[0].face.a, 0.1)
        color.setY(intersects[0].face.a, 0.5)
        color.setZ(intersects[0].face.a, 1)

        // verticle 2
        color.setX(intersects[0].face.b, 0.1)
        color.setY(intersects[0].face.b, 0.5)
        color.setZ(intersects[0].face.b, 1)

        // verticle 3
        color.setX(intersects[0].face.c, 0.1)
        color.setY(intersects[0].face.c, 0.5)
        color.setZ(intersects[0].face.c, 1)

        intersects[0].object.geometry.attributes.color.needsUpdate = true


        const initialColor = {
            r: 0,
            g: .19,
            b: .4
        }

        const hoverColor = {
            r: 0.1,
            g: .5,
            b: 1
        }

    }



})
