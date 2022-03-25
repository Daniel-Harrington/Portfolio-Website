import camera from './camera.js';
import { renderer } from './renderer';
import { scene, sizes } from './globals.js';
import { skybox, water, updateSun, skillsBox,projectsBox } from './objects.js';
import { initLights } from './lights';
import { setupBoxInteractions, setupSky} from './interaction.js';

let skills,projects,sky;
async function init() {
    skills = await skillsBox()
    projects = await projectsBox() 
    //Adding all meshes to scene
    scene.add(skills.mesh)
    setupBoxInteractions(skills)
    setupBoxInteractions(projects)
    // ContentBoxes.forEach(box => {
    //     scene.add(box.mesh)
    //     setupBoxInteractions(box)
    // });
    
   
    scene.add(camera)
    console.log(skybox)
    sky = skybox
    scene.add(sky)  
    console.log(water)
    scene.add(water)
    setupSky(sky)

    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    //Adding Lights
    initLights()



}




export { init, skills,sky,projects }