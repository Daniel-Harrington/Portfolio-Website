import { scene } from './globals';
import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import { Interaction } from 'three.interaction';
import { renderer } from './renderer';
import camera from './camera';
import { sun } from './lights';

/**
 * Interaction Handling
 */

//It thinks this is unused but this is necessary for interactions
const interaction = new Interaction(renderer, scene, camera)

//Checks if a tween is in progress to 
//prevent incorrect tweens and crashing from spam clicks
let tweenInProgress = false;

//Skybox Interaction
function setupSky(sky) {
    let quaternion = new THREE.Quaternion()
    const horizon = sky.getWorldQuaternion(quaternion).clone()
    // const horizonB = sky.rotateX((Math.PI/2)-(Math.PI/6.5)).getWorldQuaternion(quaternion).clone()

    window.addEventListener("wheel", ev => {
        if (!tweenInProgress) {
            let scrollDistance = ev.deltaY
            const newRotation = sky.rotation.x - scrollDistance / 600
            let tweenRot = new TWEEN.Tween(sky.rotation)
                .to({ x: newRotation }, 1000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start();

            if (sky.getWorldQuaternion(quaternion).x >= 0 && sky.getWorldQuaternion(quaternion).x <= 0.5) {
                console.log('front:', sky.getWorldQuaternion(quaternion).x)
                let tweenSun = new TWEEN.Tween(sun)
                    .to({
                        intensity: Math.max(Math.min(10 * (sky.rotation.x - scrollDistance), 5), 0)
                    }, 500)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .start();
                    
                tweenSun = new TWEEN.Tween(sun.position)
                    .to({
                        z: Math.max(Math.min(sun.position.z - scrollDistance * 10, 12000), -12000)
                    }, 500)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .start();
            }
            else if (sky.getWorldQuaternion(quaternion).x > 0.5 && sky.getWorldQuaternion(quaternion).x < 1) {
                console.log('back:', sky.getWorldQuaternion(quaternion).x)
                let tweenSun = new TWEEN.Tween(sun)
                    .to({
                        intensity: Math.max(Math.min(10*(sky.rotation.x + scrollDistance), 5), 0),
                    }, 500)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .start();

                tweenSun = new TWEEN.Tween(sun.position)
                    .to({
                        z: Math.max(Math.min(sun.position.z - scrollDistance * 10, 12000), -12000)

                    }, 500)
                    .easing(TWEEN.Easing.Quadratic.Out)
                    .start();
            }
            else {
                console.log('night: ', sky.getWorldQuaternion(quaternion).x)
                sun.position.z += scrollDistance * 10
            }
            console.log('cur sun intensity', sun.intensity)

        }
    }, { passive: true });


}

//Box Interactions

function setupBoxInteractions(object) {
    //Makes hovering with the cursor indicate box is clickable
    object.mesh.cursor = 'pointer';
    object.mesh.on('touchstart', ev => {
        if (!tweenInProgress) {
            contentboxOnClick(object.mesh, object.defaultRot, object.defaultPos, object.clicked)
            //Flips the box clicked bool attribute
            object.clicked = !object.clicked
        }
    }, { passive: true })
    object.mesh.on('touchmove', ev => {
        console.log(ev)
    }, { passive: true })

    //Handles Clicks
    object.mesh.on('mousedown', ev => {
        if (!tweenInProgress) {
            contentboxOnClick(object.mesh, object.defaultRot, object.defaultPos, object.clicked)
            //Flips the box clicked bool attribute
            object.clicked = !object.clicked
        }
    })

};

//Handles Content Animations
const contentboxOnClick = (box, defaultRot, defaultPos, boxClicked) => {
    console.log('box', box)
    console.log('boxDefR', defaultRot)
    console.log('boxDefP', defaultPos)
    const content = document.getElementById('content-area')
    let currentPos = box.position
    console.log('currentpos', box.position)
    //Initializing new position in clear camera view
    const newPos = new THREE.Vector3(0, 0, 4000)
    if (tweenInProgress == false) {
        //Checks whether this is bring-to-front or put-back click
        if (boxClicked == false) {
            //Tween for (Any Start) -> (Front and Center)
            let tweenCamPos = new TWEEN.Tween(camera.position)
                .to({
                    x: 2500,
                    y: 500,
                    z: 0
                }, 1000)
                .easing(TWEEN.Easing.Back.In)
                .onComplete(() => {
                    content.style.visibility = 'visible'
                    content.classList.add('fade-in');
                })
                .onStart(() => { tweenInProgress = true })
                .start();
            let tweenBoxPos = new TWEEN.Tween(box.position)
                .to({
                    x: -2000,
                    y: 2500,
                    z: 0
                }, 1000)
                .easing(TWEEN.Easing.Cubic.Out)
                .onComplete(() => {
                    tweenInProgress = false
                    boxClicked = true
                })
                .start();
            //Tween for (Any Rotation) -> (180 flip on Y axis and turned to face camera)
            let tweenCamRot = new TWEEN.Tween(camera.rotation)
                .to({
                    y: Math.PI / 2
                }, 1000)
                .easing(TWEEN.Easing.Linear.None)
                .onStart(() => { tweenInProgress = true })
                .start();
            let tweenBoxRot = new TWEEN.Tween(box.rotation)
                .to({
                    x: 0,
                    y: -Math.PI / 2,
                    z: 0
                }, 300)
                .easing(TWEEN.Easing.Cubic.Out)
                .onComplete(() => {
                    tweenInProgress = false
                    boxClicked = true
                })
                .start();
        }
        else {
            //Tween for (Front and Center) -> (Object's initial position)
            content.classList.remove('fade-in')
            let tweenRotation = new TWEEN.Tween(box.rotation)
                .to({
                    x: defaultRot.x,
                    y: defaultRot.y,
                    z: defaultRot.z
                }, 300)
                .easing(TWEEN.Easing.Back.In)
                .onComplete(() => {
                    tweenInProgress = false
                    boxClicked = false
                })
                .start();
            let boxPos = new TWEEN.Tween(box.position)
                .to(defaultPos, 600)
                .easing(TWEEN.Easing.
                    Back.In)
                .onComplete(() => {
                    tweenInProgress = false
                    boxClicked = true
                    //Tween for (Flipped and Facing Camera) -> (Object's initial Rotation)
                    //Waiting until position tween is done so rotation doesn't clip Camera\

                })
                .start();
            let tweenCamPos = new TWEEN.Tween(camera.position)
                .to({
                    x: 0,
                    y: -200,
                    z: 5000
                }, 700)
                .easing(TWEEN.Easing.
                    Back.In)
                .onStart(() => { tweenInProgress = true })
                .onComplete(() => {
                    content.style.visibility = 'hidden'
                })
                .start();
            let tweenCamRot = new TWEEN.Tween(camera.rotation)
                .to({
                    y: 0
                }, 700)
                .easing(TWEEN.Easing.Cubic.In)
                .onStart(() => { tweenInProgress = true })
                .start();

        }
    }

}

export { setupBoxInteractions, setupSky }