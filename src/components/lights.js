import { scene } from './globals'
import * as dat from 'dat.gui';
import {AmbientLight,DirectionalLight,DirectionalLightHelper} from 'three';

// Lights
function initLights(){
    const gui = new dat.GUI()
    const skylight = new DirectionalLight()
    skylight.name = "Skylight"
    skylight.position.x = 23
    skylight.position.y = 400
    skylight.position.z = 1000
    skylight.decay = 1
    skylight.intensity = 1
    scene.add(skylight)
    
    //Debug GUI setup
    const light1 = gui.addFolder('Light 1')
    
    light1.add(skylight.position, 'y').min(-10000).max(10000).step(0.01)
    light1.add(skylight.position, 'x').min(-10000).max(10000).step(0.01)
    light1.add(skylight.position, 'z').min(-10000).max(10000).step(0.01)
    light1.add(skylight, 'intensity').min(0).max(100).step(0.01)
    
    const LightHelper = new DirectionalLightHelper(skylight, 1)
    // scene.add(LightHelper)

    const ambient = new AmbientLight()
    ambient.intensity = 0.4
    scene.add(ambient)
}

export {initLights};