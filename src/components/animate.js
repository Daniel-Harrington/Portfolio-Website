import * as THREE from 'three';
import { skills, sky, projects } from './init';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import { render, renderer } from './renderer';
import { stats, rendererStats } from './debug';
import { water } from './objects';
import { sun } from './lights';
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // Update objects
    water.material.uniforms['time'].value += 1.2 / 144;

    skills.mesh.position.y += -0.25 * Math.sin(elapsedTime)
    projects.mesh.position.y += 0.25 * Math.sin(elapsedTime)
    sky.rotation.x += 0.0001
    sun.intensity = Math.max(10 * Math.sin(sky.rotation.x - 0.5), 0)
    // console.log('time uniform:', water.material.uniforms['time'].value )
    // Content Boxes Floating Animation

    //Tween updates
    TWEEN.update()

    // Render
    render()

    //Stats
    rendererStats.update(renderer);
    stats.update()
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

export { tick }