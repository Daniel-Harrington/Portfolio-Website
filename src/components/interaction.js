import { scene } from './globals';
import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';
import { Interaction } from 'three.interaction';
import { renderer } from './renderer';
import camera from './camera';

/**
 * Interaction Handling
 */

//It thinks this is unused but this is necessary for interactions
const interaction = new Interaction(renderer, scene, camera)

//Checks if a tween is in progress to 
//prevent incorrect tweens and crashing from spam clicks
let tweenInProgress = false;

//Box Interactions

function setupBoxInteractions(object) {
    //Makes hovering with the cursor indicate box is clickable
    object.mesh.cursor = 'pointer';
    object.mesh.on('touchstart', ev => {
        console.log(ev)
    })
    object.mesh.on('touchmove', ev => {
        console.log(ev)
    })

    //Handles Clicks
    object.mesh.on('mousedown', ev => {
        if(!tweenInProgress){
            contentboxOnClick(object.mesh, object.defaultRot, object.defaultPos, object.clicked)
            //Flips the box clicked bool attribute
            object.clicked = !object.clicked
        }
    })

};

//Handles Content Animations
const contentboxOnClick = (box, defaultRot, defaultPos, boxClicked) => {
    console.log('box',box)
    console.log('boxDefR',defaultRot)
    console.log('boxDefP',defaultPos)
    let currentPos = box.position
    console.log('currentpos',box.position)
    //Initializing new position in clear camera view
    const newPos = new THREE.Vector3(0, 0, 0)
    if (tweenInProgress == false) {
        //Checks whether this is bring-to-front or put-back click
        if (boxClicked == false) {
            //Tween for (Any Start) -> (Front and Center)
            let tweenPos = new TWEEN.Tween(currentPos)
                .to(newPos, 400)
                .easing(TWEEN.Easing.Cubic.In)
                .onStart(() => { tweenInProgress = true })
                .start();
            //Tween for (Any Rotation) -> (180 flip on Y axis and turned to face camera)
            let tweenRotation = new TWEEN.Tween(box.rotation)
                .to({ y: Math.PI }, 300)
                .easing(TWEEN.Easing.Cubic.Out)
                .onComplete(() => {
                    tweenInProgress = false
                    boxClicked = true
                })
                .start();
        }
        else {
            //Tween for (Front and Center) -> (Object's initial position)
            let tweenPos = new TWEEN.Tween(currentPos)
                .to(defaultPos, 400)
                .easing(TWEEN.Easing.Cubic.In)
                .onStart(() => { tweenInProgress = true })
                .onComplete(() => {
                    //Tween for (Flipped and Facing Camera) -> (Object's initial Rotation)
                    //Waiting until position tween is done so rotation doesn't clip Camera
                    let tweenRotation = new TWEEN.Tween(box.rotation)
                        .to({ y: defaultRot.y }, 300)
                        .easing(TWEEN.Easing.Cubic.Out)
                        .onComplete(() => {
                            tweenInProgress = false
                            boxClicked = false
                        })
                        .start();
                })
                .start();
        }
    }
}
export { setupBoxInteractions }