import { init } from './components/init';
import { tick } from './components/animate.js'
import './style.css';

//Loading

async function main() {
    await init()
    tick()
}
//Texture Loading
//Initialize 
main()