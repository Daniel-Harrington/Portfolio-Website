import { scene } from './globals'
import { AmbientLight, DirectionalLight,PointLight,PointLightHelper } from 'three';
// Lights
let sun;



function initLights() {
    // scene.add(LightHelper)
    const ambient = new AmbientLight()
    ambient.intensity = 0.4
    scene.add(ambient)

    sun = new DirectionalLight(0xfffecd)
    sun.intensity = 10
    sun.position.y =  3000
    sun.position.z =  0
    scene.add(sun)
    
    const optionLight = new PointLight(0x8e8e8e, 1, 0,4 );
    optionLight.power = 40
    optionLight.position.set( 0, 1000, 1000 )
    scene.add( optionLight );
    // const helper = new PointLightHelper(optionLight,100)
    // scene.add(helper)
    
    
}

export { initLights, sun};