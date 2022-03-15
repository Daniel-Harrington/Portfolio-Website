import { loadModels, waveNormalTexture } from './loaders';
import * as THREE from 'three';
// Objects
const waveGeometry = new THREE.PlaneBufferGeometry(1000, 7000, 20, 140)

const contentBoxGeometry = new THREE.BoxBufferGeometry(1600, 800, 200)


// Materials
const waveMaterial = new THREE.MeshStandardMaterial()
waveMaterial.metalness = 0.2
waveMaterial.roughness = 0.8
waveMaterial.color = new THREE.Color(0xff0000)
waveMaterial.normalMap = waveNormalTexture
waveMaterial.wireframe = false
waveMaterial.depthTest = false

const contentBoxMaterial = new THREE.MeshStandardMaterial()
contentBoxMaterial.metalness = 1
contentBoxMaterial.roughness = 1
contentBoxMaterial.fog = false
contentBoxMaterial.normalMap = waveNormalTexture

/*
* Creating Meshes
*/
const wave = new THREE.Mesh(waveGeometry, waveMaterial)

//Adjusting wave positioning
wave.rotateX(- Math.PI / 2);
wave.rotateY(Math.PI / 8);
wave.rotateZ(-Math.PI / 2);
wave.translateZ(-400);

//Reusable Content Box Mesh
const contentBox = new THREE.Mesh(contentBoxGeometry, contentBoxMaterial)

// Moved far from the camera, adjusted here so it will be consistent across all boxes
contentBox.translateZ(-1500)
class ContentBox {
    constructor(box,defaultRot,defaultPos){
        this.mesh = box
        this.defaultPos = defaultPos
        this.defaultRot = defaultRot
        this.clicked = false
    }
}
//Setup Boxes
function createBox(obj){
    return new ContentBox(obj,obj.rotation.clone(),obj.position.clone())
}


//Individual Box Adjustments

//Box1
const box1 = contentBox.clone()

//Box2
const box2 = contentBox.clone()
box2.translateX(2000)
box2.rotateY(-Math.PI/3)

//Box3
const box3 = contentBox.clone()
box3.translateY(1000)

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
const contentBox1 = new ContentBox(box1,box1DefaultRot,box1DefaultPos)
const contentBox2 = new ContentBox(box2,box2DefaultRot,box2DefaultPos)
const contentBox3 = new ContentBox(box3,box3DefaultRot,box3DefaultPos)
ContentBoxes.push(contentBox1)
ContentBoxes.push(contentBox2)
ContentBoxes.push(contentBox3)


export {
    ContentBoxes,
    wave,
    contentBox1,
    contentBox2,
    contentBox3,
    createBox,
}
