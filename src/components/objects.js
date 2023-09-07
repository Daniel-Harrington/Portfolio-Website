
import { BoxGeometry, CircleGeometry, TextureLoader, RepeatWrapping, Vector3, Mesh } from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { scene } from './globals';
import { loadModels, skyboxMaterialArray } from './loaders';
//
// Objects
const skyboxGeometry = new BoxGeometry(30000, 30000, 30000);
const waterGeometry = new CircleGeometry(10000, 500);

// Materials
const skyboxMaterial = skyboxMaterialArray


let water = new Water(
    waterGeometry,
    {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new TextureLoader().load('textures/waternormals.webp', function (texture) {

            texture.wrapS = texture.wrapT = RepeatWrapping;

        }),
        sunDirection: new Vector3(),
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

console.log('water:', water)
//

const skybox = new Mesh(skyboxGeometry, skyboxMaterial);



// Moved far from the camera, adjusted here so it will be consistent across all boxes
class ContentBox {
    constructor(box, defaultRot, defaultPos,id) {
        this.mesh = box
        this.defaultPos = defaultPos
        this.defaultRot = defaultRot
        this.clicked = false
        this.boxName = id
    }
}
//Setup Boxes
function createBox(obj,id) {
    let box = new ContentBox(obj, obj.rotation.clone(), obj.position.clone(),id)
   
    return box
}

//Rotate Sky

skybox.rotateY(Math.PI / 2)
skybox.rotation.x += Math.PI/6.5
// const pmremGenerator = new THREE.PMREMGenerator(renderer);
// scene.environment = pmremGenerator.fromEquirectangular
//Individual Box Adjustments

//skillsbox
//DeepCopying the needed default info before any tweening is applied


async function skillsBox() {
    const { skills } = await loadModels()
    console.log('skills:', skills)
    scene.add(skills)
    skills.scale.set(5,5,5)
    
    skills.position.set(-1800, 0, -800)
    skills.rotateY(Math.PI / 8)
    const skillsBox = createBox(skills,"Skills")
    console.log('SkillsBox:', skillsBox)
    return skillsBox
}
async function projectsBox() {
    const { projects } = await loadModels()
    console.log(' projects:', projects)
    scene.add(projects)
    projects.position.set(0, 0, -1000)
    projects.scale.set(5,5,5)
    
    const projectsBox = createBox(projects,"Projects")
    console.log(' projectsBox:', projectsBox)
    return projectsBox
}
async function contactBox() {
    const { contact } = await loadModels()
    console.log(' contact:', contact)
    scene.add(contact)
    contact.position.set(1800, 0, -800)
    contact.scale.set(5,5,5)
    contact.rotateY(-Math.PI / 8)
    const contactBox = createBox(contact,"contact")
    console.log(' contactBox:', contactBox)
    return contactBox
}
console.log('this is water uniforms', water.material.uniforms['size'].value)

export {
    createBox,
    skybox,
    water,
    skillsBox,
    projectsBox,
    contactBox
};

