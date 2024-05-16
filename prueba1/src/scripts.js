// const express = require('express');
// const app = express();
// const path = require('path');

// // Sirve los archivos estáticos desde la carpeta 'public'
// app.use(express.static(path.join(__dirname, 'assets')));

// app.listen(3000, () => {
//   console.log('Servidor corriendo en http://localhost:3000');
// });

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// const gltfLoader = new GLTFLoader ();
// gltfLoader.load('./assets/scene.gltf' , (gltfscene) =>{
//     test.scene.add(gltfscene);
// })

// gltfLoader.load(
//     '.assets/scene.gltf',
//     (gltfscene) => {
//         scene.add(gltfscene.scene);
//     },
//     undefined,
//     (error) => {
//         console.error('Error al cargar el archivo GLTF:', error);
//     }
// );


const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls (camera,renderer.domElement);


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)

camera.position.set (-10, 30, 30)
orbit.update();

const boxGeomtry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00 });
const box = new THREE.Mesh(boxGeomtry,boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshStandardMaterial({color : 0xFFFFFF,
    side: THREE.DoubleSide
});

const plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(4 , 50 ,50);
    const sphereMaterial = new THREE.MeshStandardMaterial({color: 0x0000FF,
    wireframe: false});
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphere);
sphere.position.set(-10,10,0)
sphere.castShadow = true;

const ambientLight = new THREE.AmbientLight(0x333333 , 1.0);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF,0.8);
scene.add(directionalLight);
directionalLight.position.set(-30,30,0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.bottom = -12;

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight,5);
// scene.add(dLightHelper);

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper)

const spotlight = new THREE.SpotLight(0xFFFFFF , 1.0);
scene.add(spotlight);
spotlight.position.set(-50,100,0);
spotlight.castShadow = true;
spotlight.angle = 0.2;

const sLightHelper = new THREE.SpotLightHelper(spotlight);
scene.add(sLightHelper);


const gui = new dat.GUI();

const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01,
    angle: 0.2,
    penumbra: 0,
    intensity: 1
};

gui.addColor(options, 'sphereColor').onChange(function(e){
    sphere.material.color.set(e)
});

gui.add(options, 'wireframe').onChange(function(e){
    sphere.material.wireframe = e;
});

gui.add(options, 'speed' , 0,0.1);

gui.add(options, 'angle' , 0, 1);
gui.add(options, 'penumbra' , 0, 1);
gui.add(options, 'intensity' , 0, 1);

let step = 0

function animate(time) {
    box.rotation.x  = time / 1000;
    box.rotation.y  = time / 1000;

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    spotlight.angle = options.angle;
    spotlight.penumbre = options.penumbra;
    spotlight.intensity = options.intensity;
    sLightHelper.update();

    renderer.render(scene,camera)
}

renderer.setAnimationLoop(animate);






