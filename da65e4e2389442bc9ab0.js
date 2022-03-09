import"./style.css";import*as THREE from"three";import{OrbitControls}from"three/examples/jsm/controls/OrbitControls.js";import*as dat from"dat.gui";const textureLoader=new THREE.TextureLoader,waveNormalTexture=textureLoader.load("Glass_Window_003_normal.jpg");waveNormalTexture.wrapS=waveNormalTexture.wrapT=THREE.RepeatWrapping,waveNormalTexture.repeat.set(50,50);const gui=new dat.GUI,canvas=document.querySelector("canvas.webgl"),scene=new THREE.Scene,waveGeometry=new THREE.PlaneBufferGeometry(1e4,1e4,500,500),box1Geometry=new THREE.BoxBufferGeometry(100,100,100),waveMaterial=new THREE.MeshStandardMaterial;waveMaterial.metalness=.2,waveMaterial.roughness=.8,waveMaterial.color=new THREE.Color(16711680),waveMaterial.normalMap=waveNormalTexture,waveMaterial.wireframe=!1;const box1Material=new THREE.MeshStandardMaterial;box1Material.roughness=1,box1Material.color=new THREE.Color(2368548);const wave=new THREE.Mesh(waveGeometry,waveMaterial);scene.add(wave);const box1=new THREE.Mesh(box1Geometry,box1Material);scene.add(box1);const pointLight1=new THREE.DirectionalLight;pointLight1.position.x=23,pointLight1.position.y=-20.77,pointLight1.position.z=601,pointLight1.decay=1,pointLight1.intensity=6,scene.add(pointLight1);const light1=gui.addFolder("Light 1");light1.add(pointLight1.position,"y").min(-1e3).max(1e3).step(.01),light1.add(pointLight1.position,"x").min(-1e3).max(1e3).step(.01),light1.add(pointLight1.position,"z").min(-1e3).max(2e3).step(.01),light1.add(pointLight1,"intensity").min(0).max(100).step(.01);const pointLightHelper=new THREE.PointLightHelper(pointLight1,1);scene.add(pointLightHelper);const light1Color={color:16711680};light1.addColor(light1Color,"color").onChange((()=>{pointLight1.color.set(light1Color.color)}));const pointLightHelper1=new THREE.PointLightHelper(pointLight1,1);scene.add(pointLightHelper1);const sizes={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",(()=>{sizes.width=window.innerWidth,sizes.height=window.innerHeight,camera.aspect=sizes.width/sizes.height,camera.updateProjectionMatrix(),renderer.setSize(sizes.width,sizes.height),renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))}));const camera=new THREE.PerspectiveCamera(120,sizes.width/sizes.height,10,1e3);camera.position.x=0,camera.position.y=50,camera.position.z=400,scene.add(camera);const renderer=new THREE.WebGLRenderer({canvas,alpha:!1});renderer.setSize(sizes.width,sizes.height),renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),wave.rotateX(-Math.PI/2),wave.rotateY(Math.PI/8),wave.rotateZ(-Math.PI/2),wave.translateZ(-400);const clock=new THREE.Clock,tick=()=>{const e=clock.getElapsedTime(),t=wave.geometry.attributes.position;box1.rotation.y=.5*e,box1.position.y+=.5*Math.sin(e),new THREE.Vector3(0,0,0);const i=new THREE.Vector3;for(let o=0,a=t.count;o<a;o++){i.fromBufferAttribute(t,o);const a=100*Math.sin(i.y/-200+e);t.setZ(o,a)}t.needsUpdate=!0,renderer.render(scene,camera),window.requestAnimationFrame(tick)};tick();