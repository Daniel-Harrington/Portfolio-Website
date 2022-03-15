import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import { render,renderer } from './renderer';
import {ContentBoxes,wave} from './objects'
import { stats,rendererStats } from './debug';

const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // Update objects
   
    // Content Boxes Floating Animation
    ContentBoxes.forEach(box => {
        box.mesh.position.y += -0.25 * Math.sin(elapsedTime)
        box.mesh.needsUpdate = true
    });
    //Wave Animation

    const pos = wave.geometry.attributes.position;
    const vec3 = new THREE.Vector3(); // re-use
    for (let i = 0, l = pos.count; i < l; i++) {
        
        //Gets the x,y,z values of vertex at current position
        vec3.fromBufferAttribute(pos, i);

        //Applies Sinusoidal Function To Z Values of Plane Vertices
        const z = Math.sin((vec3.y / -200 + elapsedTime)) * 100;
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

export {tick}