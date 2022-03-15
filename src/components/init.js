import camera from './camera.js';
import { renderer } from './renderer';
import { scene,sizes } from './globals.js';
import { wave, ContentBoxes, createBox } from './objects.js';
import { setupLights } from './lights';
import { setupBoxInteractions } from './interaction.js';
import { loadModels } from './loaders.js';

async function init() {
    //Adding all meshes to scene
    const testData = await loadModels()
    console.log('here',testData)
    scene.add(testData)
    const skillsBox = createBox(testData,testData.position.clone(),testData.rotation.clone())
    console.log('SkillsBox:',skillsBox)
    setupBoxInteractions(skillsBox)
    // ContentBoxes.forEach(box => {
    //     scene.add(box.mesh)
    //     setupBoxInteractions(box)
    // });
    scene.add(camera)
    scene.add(wave)

    //Window Resizing Handler
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
    setupLights()
}




export { init}