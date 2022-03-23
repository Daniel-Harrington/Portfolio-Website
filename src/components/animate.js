import * as THREE from 'three';
import { skills, sky } from './init';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import { render, renderer } from './renderer';
import { ContentBoxes, skybox, wave } from './objects'
import { stats, rendererStats } from './debug';
import { water } from './objects';
import { scene } from './globals';
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // Update objects
    water.material.uniforms['time'].value += 1/144;

    if(!skills.clicked)
    {
        skills.mesh.position.y += -0.25 * Math.sin(elapsedTime)
    }

    sky.rotation.x -= 0.0003
    // console.log('time uniform:', water.material.uniforms['time'].value )
    // Content Boxes Floating Animation

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