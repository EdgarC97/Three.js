import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const loadModel = (path, scene, position, scale) => {
  const loader = new GLTFLoader();
  loader.load(path, (gltf) => {
    gltf.scene.position.set(...position);
    gltf.scene.scale.set(...scale);
    scene.add(gltf.scene);
  });
}