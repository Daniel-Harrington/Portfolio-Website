import { scene } from './globals'
import {AmbientLight,HemisphereLight} from 'three';

// Lights
let sun;
function initLights(){
    // scene.add(LightHelper)
    const ambient = new AmbientLight()
    ambient.intensity = 0.4
    scene.add(ambient)
    sun = new HemisphereLight()
    sun.intensity = 10
    
    scene.add(sun)
}

export {initLights,sun};