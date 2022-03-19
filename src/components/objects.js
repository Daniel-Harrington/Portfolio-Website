import * as dat from 'dat.gui';
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { scene } from './globals';
import { loadModels, skyboxMaterialArray, waveNormalTexture } from './loaders';
import { renderer } from './renderer';
//
// Objects

const waveGeometry = new THREE.PlaneBufferGeometry(1000, 7000, 20, 140)

const contentBoxGeometry = new THREE.BoxBufferGeometry(1600, 800, 200)

const skyboxGeometry = new THREE.BoxGeometry(30000, 30000, 30000);



// Materials
const skyboxMaterial = skyboxMaterialArray
skyboxMaterial.depthWrite 

const waveMaterial = new THREE.MeshStandardMaterial()
waveMaterial.metalness = 0.8
waveMaterial.roughness = 0.2
waveMaterial.color = new THREE.Color(0xff0000)
waveMaterial.normalMap = waveNormalTexture
waveMaterial.wireframe = false
waveMaterial.depthTest = false

const contentBoxMaterial = new THREE.MeshStandardMaterial()
contentBoxMaterial.metalness = 1
contentBoxMaterial.roughness = 1
contentBoxMaterial.fog = false
contentBoxMaterial.normalMap = waveNormalTexture


let sun = new THREE.Vector3()

const waterGeometry = new THREE.PlaneGeometry(30000, 10000);

let water = new Water(
    waterGeometry,
    {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load('textures/waternormals.jpg', function (texture) {

            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

        }),
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: scene.fog !== undefined
    }
);

//Adjusting water
water.rotation.x = -Math.PI / 2
water.translateZ(-500);
water.material.uniforms.size.value = 0.1
water.material.uniforms.distortionScale.value = 95
/*
* Creating Meshes
*/
//

console.log('water:',water)
//

const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

const wave = new THREE.Mesh(waveGeometry, waveMaterial)

//Adjusting wave positioning
wave.rotateX(- Math.PI / 2);
wave.rotateY(Math.PI / 8);
wave.rotateZ(-Math.PI / 2);



//Adjusting Skybox so distortion is hidden under the horizon

//Reusable Content Box Mesh
const contentBox = new THREE.Mesh(contentBoxGeometry, contentBoxMaterial)

// Moved far from the camera, adjusted here so it will be consistent across all boxes
contentBox.translateZ(-1500)
class ContentBox {
    constructor(box, defaultRot, defaultPos) {
        this.mesh = box
        this.defaultPos = defaultPos
        this.defaultRot = defaultRot
        this.clicked = false
    }
}
//Setup Boxes
function createBox(obj) {
    let box = new ContentBox(obj, obj.rotation.clone(), obj.position.clone())
    return box
}

// const pmremGenerator = new THREE.PMREMGenerator(renderer);
// scene.environment = pmremGenerator.fromEquirectangular
//Individual Box Adjustments

//Box1
const box1 = contentBox.clone()

//Box2
const box2 = contentBox.clone()
box2.translateX(2000)
box2.rotateY(-Math.PI / 3)

//Box3
const box3 = contentBox.clone()
box3.translateY(1000)
//skillsbox
//DeepCopying the needed default info before any tweening is applied

//Box1 Defaults
const box1DefaultRot = box1.rotation.clone()
const box1DefaultPos = box1.position.clone()

//Box2 Defaults
const box2DefaultRot = box2.rotation.clone()
const box2DefaultPos = box2.position.clone()

//Box3 Defaults
const box3DefaultRot = box3.rotation.clone()
const box3DefaultPos = box3.position.clone()

//Create and fill list of ContentBoxes
const ContentBoxes = []
const contentBox1 = new ContentBox(box1, box1DefaultRot, box1DefaultPos)
const contentBox2 = new ContentBox(box2, box2DefaultRot, box2DefaultPos)
const contentBox3 = new ContentBox(box3, box3DefaultRot, box3DefaultPos)
ContentBoxes.push(contentBox1)
ContentBoxes.push(contentBox2)
ContentBoxes.push(contentBox3)
//temp

const gui = new dat.GUI();


const waterUniforms = water.material.uniforms;
console.log('waterboys',waterUniforms)
const folderWater = gui.addFolder('Water');
folderWater.add(waterUniforms.distortionScale, 'value', 0, 200, 0.1).name('distortionScale');
folderWater.add(waterUniforms.size, 'value', 0.1, 10, 0.1).name('size');
folderWater.open();

async function skillsBox() {
    const testData = await loadModels()
    console.log('here', testData)
    scene.add(testData)
    const skillsBox = createBox(testData, testData.position.clone(), testData.rotation.clone())
    console.log('SkillsBox:', skillsBox)
    return skillsBox
}
console.log('this is water uniforms',water.material.uniforms['size'].value)

export {
    ContentBoxes,
    wave,
    contentBox1,
    contentBox2,
    contentBox3,
    createBox,
    skybox,
    water,
    skillsBox
};

