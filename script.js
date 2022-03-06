import './style.css'
import * as THREE from 'https://cdn.skypack.dev/three@0.130.0/build/three.module.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//Loading
const textureLoader = new THREE.TextureLoader()

const waveNormalTexture = textureLoader.load('/textures/Glass_Window_003_normal.jpg')
waveNormalTexture.wrapS = waveNormalTexture.wrapT = THREE.RepeatWrapping;
waveNormalTexture.repeat.set(50,50);

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const waveGeometry = new THREE.PlaneBufferGeometry(10000, 10000, 500,500)

const box1Geometry = new THREE.BoxBufferGeometry(100, 100,100)
// Materials

const waveMaterial = new THREE.MeshStandardMaterial()
waveMaterial.metalness=0.2
waveMaterial.roughness=0.8
waveMaterial.color = new THREE.Color(0xff0000)
waveMaterial.normalMap=waveNormalTexture;
waveMaterial.wireframe = false

const box1Material = new THREE.MeshStandardMaterial()
box1Material.roughness = 1
box1Material.color = new THREE.Color(0x242424)


// Mesh
const wave = new THREE.Mesh(waveGeometry, waveMaterial)
scene.add(wave)

const box1 = new THREE.Mesh(box1Geometry, box1Material)
scene.add(box1)
// Lights

const pointLight1 = new THREE.DirectionalLight()
pointLight1.position.x = 23
pointLight1.position.y = -20.77
pointLight1.position.z = 601
pointLight1.decay = 1
pointLight1.intensity = 6
scene.add(pointLight1)

//Example GUI setup
const light1 = gui.addFolder('Light 1')

light1.add(pointLight1.position,'y').min(-1000).max(1000).step(0.01)
light1.add(pointLight1.position,'x').min(-1000).max(1000).step(0.01)
light1.add(pointLight1.position,'z').min(-1000).max(2000).step(0.01)
light1.add(pointLight1,'intensity').min(0).max(100).step(0.01)

const pointLightHelper = new THREE.PointLightHelper(pointLight1,1)
scene.add(pointLightHelper)

const light1Color = {
    color: 0xff0000
}
light1.addColor(light1Color, 'color')
    .onChange(()=>{
        pointLight1.color.set(light1Color.color)
    })

const pointLightHelper1 = new THREE.PointLightHelper(pointLight1,1)
scene.add(pointLightHelper1)

// const hemi = new THREE.HemisphereLight()
// scene.add(hemi)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(120, sizes.width / sizes.height, 10, 1000)
camera.position.x = 0
camera.position.y = 50
camera.position.z = 400
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: false
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Setup before animations
 */
 wave.rotateX(- Math.PI/2);
 wave.rotateY(Math.PI/8);
 wave.rotateZ(-Math.PI/2);
 wave.translateZ(-400);
/**
 * Animate
 */


const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    const pos = wave.geometry.attributes.position;
    box1.rotation.y = 0.5 * elapsedTime;
    box1.position.y += 0.5 * Math.sin(elapsedTime)
    let center = new THREE.Vector3(0,0,0);
    const vec3 = new THREE.Vector3(); // re-use
    for ( let i = 0, l = pos.count; i < l; i ++ ) {
  
      vec3.fromBufferAttribute(pos, i);
      const z = Math.sin((vec3.y/-200+elapsedTime))*100;
      
      pos.setZ(i, z);
  
    }
    
    pos.needsUpdate = true
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()