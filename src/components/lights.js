import { scene } from './globals'
import { AmbientLight, HemisphereLight, DirectionalLight,DirectionalLightHelper } from 'three';
import * as dat from 'dat.gui';
// Lights
let sun;
const gui = new dat.GUI();
function initLights() {
    // scene.add(LightHelper)
    const ambient = new AmbientLight()
    ambient.intensity = 0.4
    scene.add(ambient)

    sun = new DirectionalLight(0xfffecd)
    sun.intensity = 1
    sun.position.y =  3000
    sun.position.z =  0
    scene.add(sun)

    const light1 = gui.addFolder('Light 1')
    light1.add(sun.position, 'y').min(-6000).max(6000).step(1)
    light1.add(sun.position, 'x').min(-6000).max(6000).step(1)
    light1.add(sun.position, 'z').min(-6000).max(6000).step(1)
    light1.add(sun,'intensity').min(0).max(10).step(0.01)
    
const sunHelper = new DirectionalLightHelper(sun,2)
scene.add(sunHelper)
    // sun = new HemisphereLight()
    // sun.intensity = 0.2
    // scene.add(sun)
}

export { initLights, sun };