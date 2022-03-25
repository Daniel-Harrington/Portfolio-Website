import * as dat from 'dat.gui';
import { PerspectiveCamera } from 'three';
import { sizes, audiolistener } from './globals';

//setup camera for scene

const camera = new PerspectiveCamera(70, sizes.width / sizes.height, 10, 50000)
camera.position.x = 0
camera.position.y = -300
camera.position.z = 5000
camera.add(audiolistener);

const gui = new dat.GUI();


const folderCam = gui.addFolder('Camera');

folderCam.add(camera.position, 'y', -1000, 1000, 1).name('Y');
folderCam.add(camera.position, 'x', -1000, 10000, 1).name('X');
folderCam.add(camera.position, 'z', -1000, 10000, 1).name('Z');



export default camera