import { scene } from './globals'
import { AmbientLight, HemisphereLight, DirectionalLight,DirectionalLightHelper } from 'three';
// Lights
let sun;



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

}

export { initLights, sun };