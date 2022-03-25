import * as dat from 'dat.gui';
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { scene } from './globals';
import { loadModels, skyboxMaterialArray} from './loaders';
//
// Objects
const skyboxGeometry = new THREE.BoxGeometry(30000, 30000, 30000);
const waterGeometry = new THREE.CircleGeometry(10000, 500);

// Materials
const skyboxMaterial = skyboxMaterialArray


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
        // waterColor: 0xff3200,
        distortionScale: 3.7,
        fog: scene.fog !== undefined
    }
);

//Adjusting water
water.rotation.x = -Math.PI / 2
water.translateZ(-500);
water.material.uniforms.size.value = 1.4
water.material.uniforms.distortionScale.value = 50
/*
* Creating Meshes
*/
//

console.log('water:',water)
//

const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);


// Moved far from the camera, adjusted here so it will be consistent across all boxes

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

//Rotate Sky

skybox.rotateY(Math.PI/2)
skybox.rotateZ(Math.PI/6.5)
// const pmremGenerator = new THREE.PMREMGenerator(renderer);
// scene.environment = pmremGenerator.fromEquirectangular
//Individual Box Adjustments

//skillsbox
//DeepCopying the needed default info before any tweening is applied

//temp

const gui = new dat.GUI();


const waterUniforms = water.material.uniforms;
console.log('waterboys',waterUniforms)
const folderWater = gui.addFolder('Water');
folderWater.add(waterUniforms.distortionScale, 'value', 0, 200, 0.1).name('distortionScale');
folderWater.add(waterUniforms.size, 'value', 0.1, 10, 0.1).name('size');

async function skillsBox() {
    const {skills} = await loadModels()
    console.log('skills:',skills)
    scene.add(skills)
    skills.scale.set(2,2,2)
    skills.position.set(0, 0, -1000)
    const skillsBox = createBox(skills, skills.position.clone(), skills.rotation.clone())
    console.log('SkillsBox:', skillsBox)
    return skillsBox
}
async function projectsBox() {
    const { projects} = await loadModels()
    console.log(' projects:', projects)
    scene.add( projects)
    projects.scale.set(3,3,3)
    projects.position.set(1000, 1000, -1000)
    projects.rotateY(-Math.PI/5)
    projects.rotateX(Math.PI/6)
    const  projectsBox = createBox( projects,  projects.position.clone(),  projects.rotation.clone())
    console.log(' projectsBox:',  projectsBox)
    return  projectsBox
}
console.log('this is water uniforms',water.material.uniforms['size'].value)

export {
    createBox,
    skybox,
    water,
    skillsBox,
    projectsBox
};

