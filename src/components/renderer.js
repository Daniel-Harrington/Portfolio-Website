import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { scene,sizes,canvas } from './globals';
import camera from './camera';

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: false,
    antialias: true
})
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableZoom = false
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
function render() {
    renderer.render(scene, camera)
}
export {render,renderer,controls}