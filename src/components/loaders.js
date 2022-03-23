import * as THREE from 'three';
import { audiolistener, scene } from './globals';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


// Texture Loading
//Audio Loading
let loadSound = new THREE.Audio( audiolistener );
let ambientSound = new THREE.Audio( audiolistener );
const loadSoundLoader = new THREE.AudioLoader();
loadSoundLoader.load( './sounds/Loaded.ogg', function( buffer ) {
	loadSound.setBuffer( buffer );
	loadSound.setVolume( 1 );
});

//Loading Screen
const loadingManager = new THREE.LoadingManager( () => {
	
  const loadingScreen = document.getElementById( 'loading-screen' );
  loadingScreen.classList.add( 'fade-out' );
  loadSound.play()
  loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
} );

//
const audioLoader = new THREE.AudioLoader(loadingManager);
audioLoader.load( './sounds/Waves.ogg', function( buffer ) {
	ambientSound.setBuffer( buffer );
	ambientSound.setVolume( 0.1 );
});

function onTransitionEnd( event ) {
  
	const element = event.target;
	element.remove();
  ambientSound.play()
}
//Creates Reusable Texture Loader
const textureLoader = new THREE.TextureLoader(loadingManager)

//Skybox Texture

let skyboxImage = "corona";

function createPathStrings(filename) {

    const basePath = "./textures/skybox/";
  
    const baseFilename = basePath + filename;
  
    const fileType = ".png";
  
    const sides = ["ft", "bk", "up", "dn", "rt", "lf"];
  
    const pathStings = sides.map(side => {
  
      return baseFilename + "_" + side + fileType;
  
    });
  
    return pathStings;
  
  }

function createMaterialArray(filename) {

  const Imagepaths = createPathStrings(filename);

  const materialArray = Imagepaths.map(image => {

    let texture = new THREE.TextureLoader(loadingManager).load(image);
    let material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    return material;
  });

  return materialArray;

}

const skyboxMaterialArray = createMaterialArray(skyboxImage)


//Wave Texture
const waveNormalTexture = textureLoader.load('./textures/Carbon_Fiber_001_normal.jpg')
//Repeats and wraps the texture around wave
waveNormalTexture.wrapS = waveNormalTexture.wrapT = THREE.RepeatWrapping;

waveNormalTexture.repeat.set(5, 35); //Lower numbers = Better Performance/Lower Quality

//Model Loader



//Setup Model
async function loadModels() {
    const loader = new GLTFLoader(loadingManager)
    const testData = await Promise.resolve(loader.loadAsync('./models/Skills.glb'));
    console.log('testdata',testData);
    testData.scene.traverse(function(child){
        // console.log('traversing', child)
        if ( child.isMesh) {
           child.material.fog = false
            }
    })
    testData.scene.position.set(0,0,-1000)
    testData.scene.scale.set(2,2,2)
    scene.add(testData.scene)
    return testData.scene
}
export { waveNormalTexture, loadModels,skyboxMaterialArray}