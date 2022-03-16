import { loadModels, skyboxMaterialArray, waveNormalTexture } from './loaders';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { renderer } from './renderer';
import { scene } from './globals';
import * as THREE from 'three';
import * as dat from 'dat.gui';
//
// Objects

const waveGeometry = new THREE.PlaneBufferGeometry(1000, 7000, 20, 140)

const contentBoxGeometry = new THREE.BoxBufferGeometry(1600, 800, 200)

const skyboxGeometry = new THREE.BoxGeometry(20000, 10000, 10000);



// Materials
const skyboxMaterial = skyboxMaterialArray

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

const sky = new Sky();
sky.scale.setScalar(10000);

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
/*
* Creating Meshes
*/
//




const skyUniforms = sky.material.uniforms;

skyUniforms['turbidity'].value = 10;
skyUniforms['rayleigh'].value = 2;
skyUniforms['mieCoefficient'].value = 0.005;
skyUniforms['mieDirectionalG'].value = 0.8;

const parameters = {
    elevation: 2,
    azimuth: 180
};

const pmremGenerator = new THREE.PMREMGenerator(renderer);

function updateSun() {

    const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
    const theta = THREE.MathUtils.degToRad(parameters.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);

    sky.material.uniforms['sunPosition'].value.copy(sun);
    water.material.uniforms['sunDirection'].value.copy(sun).normalize();

    scene.environment = pmremGenerator.fromScene(sky).texture;

}

updateSun();
//

const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

const wave = new THREE.Mesh(waveGeometry, waveMaterial)

//Adjusting wave positioning
wave.rotateX(- Math.PI / 2);
wave.rotateY(Math.PI / 8);
wave.rotateZ(-Math.PI / 2);


//Adjusting water positioning
water.rotateX(-Math.PI / 2)
water.translateZ(-500);

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

const folderSky = gui.addFolder('Sky');
folderSky.add(parameters, 'elevation', 0, 90, 0.1).onChange(updateSun);
folderSky.add(parameters, 'azimuth', - 180, 180, 0.1).onChange(updateSun);
folderSky.open();

const waterUniforms = water.material.uniforms;

const folderWater = gui.addFolder('Water');
folderWater.add(waterUniforms.distortionScale, 'value', 0, 8, 0.1).name('distortionScale');
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


export {
    ContentBoxes,
    wave,
    contentBox1,
    contentBox2,
    contentBox3,
    createBox,
    skybox,
    water,
    updateSun,
    sky,
    skillsBox
}
