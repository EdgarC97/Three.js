// Importa el archivo de estilos CSS para el estilo de la página.
import './style.css';

// Importa todo desde la biblioteca Three.js para trabajar con gráficos 3D.
import * as THREE from 'three';

// Importa los controles de órbita de los ejemplos de Three.js para permitir la interacción del usuario con la cámara.
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as dat from 'dat.gui'

// Configuración inicial
const scene = new THREE.Scene(); // Crea una nueva escena 3D.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // Crea una cámara con perspectiva.

// Crea un renderizador WebGL y especifica el canvas del DOM donde se mostrará la escena.
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// Establece la relación de píxeles del renderizador para manejar las diferencias de resolución entre dispositivos.
renderer.setPixelRatio(window.devicePixelRatio);
// Establece el tamaño del renderizador para llenar la ventana.
renderer.setSize(window.innerWidth, window.innerHeight);
// Posiciona la cámara en la escena.
camera.position.setZ(30);
camera.position.setX(-3);

// Renderiza la escena y la cámara.
renderer.render(scene, camera);

// Torus (forma de dona)
const geometry = new THREE.TorusGeometry(10, 3, 16, 100); // Define la geometría del toroide.
const material = new THREE.MeshStandardMaterial({ color: 0x7748CD }); // Define el material del toroide.
const torus = new THREE.Mesh(geometry, material); // Crea un objeto de malla con la geometría y el material.

scene.add(torus); // Añade el toroide a la escena.

// Luces
const pointLight = new THREE.PointLight(0xffffff); // Crea una luz puntual blanca.
pointLight.position.set(5, 5, 5); // Posiciona la luz puntual en la escena.

const ambientLight = new THREE.AmbientLight(0xffffff); // Crea una luz ambiental blanca.
scene.add(pointLight, ambientLight); // Añade las luces a la escena.

// Helpers (Ayudantes visuales para desarrollo, actualmente comentados)
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// Controles de órbita (comentados, pero si se descomentan permitirían al usuario rotar la cámara alrededor de la escena)
// const controls = new OrbitControls(camera, renderer.domElement);

// Función para añadir estrellas a la escena
function addStar() {
  const geometry = new THREE.SphereGeometry(0.5, 24, 24); // Define la geometría de una esfera.
  const material = new THREE.MeshStandardMaterial({ color: 0x160528 }); // Define el material de la esfera.
  const star = new THREE.Mesh(geometry, material); // Crea una estrella como objeto de malla.

  // Genera posiciones aleatorias para cada estrella.
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z); // Establece la posición de la estrella.
  scene.add(star); // Añade la estrella a la escena.
}

// Añade 200 estrellas a la escena.
Array(500).fill().forEach(addStar);

// Fondo
const spaceTexture = new THREE.TextureLoader().load('space.jpg'); // Carga una textura de espacio.
scene.background = spaceTexture; // Establece la textura como fondo de la escena.

// Avatar (Jeff)
const jeffTexture = new THREE.TextureLoader().load('Ritchie.jpg'); // Carga una textura para el avatar.


// Crea un objeto 3D para el avatar y le aplica la textura.
const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({ map: jeffTexture, }));

scene.add(jeff); // Añade el avatar a la escena.

// Luna
const moonTexture = new THREE.TextureLoader().load('moon.jpg'); // Carga una textura para la luna.
const normalTexture = new THREE.TextureLoader().load('normal.jpg'); // Carga una textura normal para dar efecto de relieve.

// Crea un objeto 3D para la luna y le aplica las texturas.
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon); // Añade la luna a la escena.

// Establece la posición inicial de la luna y el avatar.
moon.position.z = 30;
moon.position.setX(-10);
jeff.position.z = -5;
jeff.position.x = 2.5;

// Función para animar la cámara con el desplazamiento de la página.
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  // Cambia la posición de la cámara basada en el desplazamiento de la página.
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera; // Asigna la función de animación al evento de desplazamiento.
moveCamera(); // Ejecuta la función de animación.

// Bucle de animación para actualizar la escena
function animate() {
  requestAnimationFrame(animate); // Solicita el próximo cuadro de animación.

  // Actualiza la rotación del toroide y la luna.
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.009;
  torus.rotation.z += 0.01;
  moon.rotation.x += 0.005;

  // Actualiza los controles de órbita (si están activos).
  // controls.update();

  renderer.render(scene, camera); // Renderiza la escena con la cámara actualizada.
}

animate(); // Inicia el bucle de animación.
