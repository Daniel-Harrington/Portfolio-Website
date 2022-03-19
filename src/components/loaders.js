import * as THREE from 'three';
import { scene } from './globals';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// Texture Loading

//Creates Reusable Texture Loader
const textureLoader = new THREE.TextureLoader()

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

    let texture = new THREE.TextureLoader().load(image);
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
    const loader = new GLTFLoader()
    const testData = await Promise.resolve(loader.loadAsync('./models/TestModel.glb'));
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