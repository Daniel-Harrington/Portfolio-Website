import { scene } from './globals'
import * as dat from 'dat.gui';
import {PointLight,PointLightHelper,DirectionalLight,DirectionalLightHelper} from 'three';
import {wave} from './objects';

// Lights
function setupLights(){
    const gui = new dat.GUI()
    const pointLight1 = new DirectionalLight()
   
    pointLight1.position.x = 23
    pointLight1.position.y = -20.77
    pointLight1.position.z = 601
    pointLight1.decay = 1
    pointLight1.intensity = 1
    scene.add(pointLight1)
    
    //Debug GUI setup
    const light1 = gui.addFolder('Light 1')
    
    light1.add(pointLight1.position, 'y').min(-1000).max(1000).step(0.01)
    light1.add(pointLight1.position, 'x').min(-1000).max(1000).step(0.01)
    light1.add(pointLight1.position, 'z').min(-1000).max(2000).step(0.01)
    light1.add(pointLight1, 'intensity').min(0).max(100).step(0.01)
    
    const pointLightHelper = new PointLightHelper(pointLight1, 1)
    scene.add(pointLightHelper)
    
    const light1Color = {
        color: 0xff0000
    }
    light1.addColor(light1Color, 'color')
        .onChange(() => {
            pointLight1.color.set(light1Color.color)
        })
     const pointLight2 = new DirectionalLight()
    scene.add(pointLight2)
    // const hemi = new THREE.HemisphereLight()
    // scene.add(hemi)
}

export {setupLights};