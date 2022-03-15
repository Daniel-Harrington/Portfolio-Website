import {PerspectiveCamera} from 'three';
import { sizes } from './globals';

//setup camera for scene
const camera = new PerspectiveCamera(120, sizes.width / sizes.height, 10, 2000)
camera.position.x = 0
camera.position.y = 50
camera.position.z = 400


export default camera