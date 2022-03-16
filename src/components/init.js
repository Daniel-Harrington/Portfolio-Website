import camera from './camera.js';
import { renderer } from './renderer';
import { scene, sizes } from './globals.js';
import { wave, ContentBoxes, createBox, skybox, water, updateSun, sky,skil, skillsBox } from './objects.js';
import { initLights } from './lights';
import { setupBoxInteractions, setupScroll } from './interaction.js';

let skills;
async function init() {
    skills = await skillsBox()
    //Adding all meshes to scene
    scene.add(skills)
    setupBoxInteractions(skills)
    // ContentBoxes.forEach(box => {
    //     scene.add(box.mesh)
    //     setupBoxInteractions(box)
    // });
    scene.add(camera)
    console.log(skybox)
    const nebula = skybox
    scene.add(sky);
    scene.add(nebula)

    console.log(water)
    scene.add(water)
    updateSun()
    setupScroll(nebula)
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




export { init ,skills}