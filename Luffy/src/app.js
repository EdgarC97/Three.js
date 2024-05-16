import * as THREE from 'three';
import { loadModel } from './threeHelpers';

const scene = new THREE.Scene();
// ... inicialización de la cámara y el renderizador

// Carga el avatar
loadModel('models/avatar.gltf', scene, [0, 0, 0], [1, 1, 1]);

document.getElementById('try-hat').addEventListener('click', () => {
  loadModel('models/sombrero.gltf', scene, [0, 1, 0], [0.5, 0.5, 0.5]);
});
