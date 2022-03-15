import * as THREE from 'three';
import { scene } from './globals';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// Texture Loading

//Creates Reusable Texture Loader
const textureLoader = new THREE.TextureLoader()

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
        console.log('traversing', child)
        if ( child.isMesh) {
           child.material.fog = false
            }
    })
    testData.scene.position.set(0,0,-1000)
    testData.scene.scale.set(2,2,2)
    scene.add(testData.scene)
    return testData.scene
}
export { waveNormalTexture, loadModels}