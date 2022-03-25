import * as THREE from 'three';
import { audiolistener, scene } from './globals';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


// Texture Loading
//Audio Loading
let loadSound = new THREE.Audio(audiolistener);
let ambientSound = new THREE.Audio(audiolistener);
const loadSoundLoader = new THREE.AudioLoader();
loadSoundLoader.load('./sounds/Loaded.mp3', function (buffer) {
  loadSound.setBuffer(buffer);
  loadSound.setVolume(0.1);
});

//Loading Screen
const loadingManager = new THREE.LoadingManager(() => {

  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.classList.add('fade-out');
  loadSound.play()
  loadingScreen.addEventListener('transitionend', onTransitionEnd);
});

//
const audioLoader = new THREE.AudioLoader(loadingManager);
audioLoader.load('./sounds/WavesReduced.mp3', function (buffer) {
  ambientSound.setBuffer(buffer);
  ambientSound.setVolume(0.01);
  ambientSound.setLoop(true);
  ambientSound.play()
});

function onTransitionEnd(event) {

  const element = event.target;
  element.remove();

}
//Creates Reusable Texture Loaders
const textureLoader = new THREE.TextureLoader(loadingManager)
//Skybox Texture

let skyboxImage = "space";

function createPathStrings(filename) {

  const basePath = "./textures/skybox/";

  const baseFilename = basePath + filename;

  const fileType = ".webp";

  const sides = ["px", "nx", "py", "ny", "pz", "nz"];

  const pathStings = sides.map(side => {

    return baseFilename + "_" + side + fileType;

  });

  return pathStings;

}

function createMaterialArray(filename) {

  const Imagepaths = createPathStrings(filename);

  const materialArray = Imagepaths.map(image => {

    let texture = textureLoader.load(image);
    let material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    return material;
  });

  return materialArray;

}

const skyboxMaterialArray = createMaterialArray(skyboxImage)
//Setup Model
function setupModel(data) {
  const model = data.scene;
  return model;
}

//Model Loader


async function loadModels() {
  const loader = new GLTFLoader(loadingManager)
  const [skillsData,projectsData] = await Promise.all([
    loader.loadAsync('./models/Skills.glb'),
    loader.loadAsync('./models/Projects.glb')
  ]);
   
  const skills = setupModel( skillsData)
  const projects = setupModel(projectsData)
  return {
    skills,
    projects
  }
}
export {loadModels, skyboxMaterialArray }