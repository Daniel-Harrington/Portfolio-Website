import { scene } from './globals'
import * as dat from 'dat.gui';
import {AmbientLight,DirectionalLight,DirectionalLightHelper,HemisphereLight} from 'three';

// Lights
let sun;
function initLights(){
    const gui = new dat.GUI()
    // scene.add(LightHelper)
    const ambient = new AmbientLight()
    ambient.intensity = 0.4
    scene.add(ambient)
    sun = new HemisphereLight()
    sun.intensity = 10
    const sun1 = gui.addFolder('Sun')
    
    sun1.add(sun.position, 'y').min(-10000).max(10000).step(0.01)
    sun1.add(sun.position, 'x').min(-10000).max(10000).step(0.01)
    sun1.add(sun.position, 'z').min(-10000).max(10000).step(0.01)
    sun1.add(sun, 'intensity').min(0).max(100).step(0.01)
    scene.add(sun)
}

export {initLights,sun};