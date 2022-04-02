import * as THREE from 'three';
import { skills, sky, projects } from './init';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import { controls, render, renderer } from './renderer';
import { stats, rendererStats } from './debug';
import { water } from './objects';
import { sun } from './lights';
const clock = new THREE.Clock()
let quaternion = new THREE.Quaternion()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()


    water.material.uniforms['time'].value = elapsedTime + 1;

    skills.mesh.position.y += -0.25 * Math.sin(elapsedTime)
    projects.mesh.position.y += 0.25 * Math.sin(elapsedTime)

    //Simulating Day/Night Cycle

    // console.log('time uniform:', water.material.uniforms['time'].value )
    // Content Boxes Floating Animation

    //Tween updates
    TWEEN.update()

    // Render
    render()

    //Stats
    controls.update()
    rendererStats.update(renderer);
    stats.update()
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

export { tick }