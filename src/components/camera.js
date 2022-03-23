import {PerspectiveCamera} from 'three';
import { sizes,audiolistener } from './globals';

//setup camera for scene
const camera = new PerspectiveCamera(55, sizes.width / sizes.height, 10, 30000)
camera.position.x = 0
camera.position.y = 50
camera.position.z = 5000
camera.add( audiolistener );

export default camera