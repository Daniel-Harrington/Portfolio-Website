import * as THREE from 'three';
import { scene,sizes,canvas } from './globals';
import camera from './camera';

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: false,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
function render() {
    renderer.render(scene, camera)
}
export {render,renderer}