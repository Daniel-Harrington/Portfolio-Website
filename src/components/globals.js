import * as THREE from 'three';
const scene = new THREE.Scene()
scene.fog = new THREE.Fog('black', 0, 500)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const canvas = document.querySelector('canvas.webgl')


export {scene,canvas,sizes}