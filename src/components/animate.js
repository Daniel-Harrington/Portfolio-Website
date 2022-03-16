import * as THREE from 'three';
import { skills } from './init';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import { render, renderer } from './renderer';
import { ContentBoxes, skybox, wave } from './objects'
import { stats, rendererStats } from './debug';
import { water } from './objects';
const clock = new THREE.Clock()

let i=0
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // Update objects
    
    water.material.uniforms['time'].value = elapsedTime *0.01;
    // console.log('time uniform:', water.material.uniforms['time'].value )
    // Content Boxes Floating Animation
    ContentBoxes.forEach(box => {
        box.mesh.position.y += -0.25 * Math.sin(elapsedTime)
        box.mesh.needsUpdate = true
    });
    //Wave Animation
    let pos = wave.geometry.attributes.position;
    const vec3 = new THREE.Vector3(); // re-use
    for (let i = 0, l = pos.count; i < l; i++) {

        //Gets the x,y,z values of vertex at current position
        vec3.fromBufferAttribute(pos, i);

        //Applies Sinusoidal Function To Z Values of Plane Vertices
        let z = Math.sin((vec3.y / -200 + elapsedTime)) * 100;
        pos.setZ(i, z);
    }
    pos.needsUpdate = true
    
    //Tween updates
    TWEEN.update()

    // Render
    render()

    //Stats
    stats.update()
    rendererStats.update(renderer);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

export { tick }