import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

import { OrbitControls } from "https://unpkg.com/three@0.179.1/examples/jsm/controls/OrbitControls.js";

import { GLTFLoader } from "https://unpkg.com/three@0.179.1/examples/jsm/loaders/GLTFLoader.js";



const canvas = document.querySelector("#viewerCanvas");



const scene = new THREE.Scene();

scene.background = null;



const camera = new THREE.PerspectiveCamera(

    35,

    canvas.clientWidth / canvas.clientHeight,

    0.1,

    100

);

camera.position.set(0, 1.5, 5);





const renderer = new THREE.WebGLRenderer({

    canvas,

    antialias: true,

    alpha: true

});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(canvas.clientWidth, canvas.clientHeight);

renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.shadowMap.enabled = true;

renderer.shadowMap.type = THREE.PCFSoftShadowMap;





/*==============================
    LIGHTS
==============================*/

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);

scene.add(ambientLight);



const keyLight = new THREE.DirectionalLight(0xffffff, 4);

keyLight.position.set(4, 8, 4);

keyLight.castShadow = true;

scene.add(keyLight);



const rimLight = new THREE.DirectionalLight(0x7aa8ff, 2);

rimLight.position.set(-5, 3, -5);

scene.add(rimLight);





/*==============================
    FLOOR
==============================*/

const floor = new THREE.Mesh(

    new THREE.CircleGeometry(8, 64),

    new THREE.ShadowMaterial({

        opacity: 0.18

    })

);

floor.rotation.x = -Math.PI / 2;

floor.position.y = -1.15;

floor.receiveShadow = true;

scene.add(floor);





/*==============================
    CONTROLS
==============================*/

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

controls.enablePan = false;

controls.enableZoom = false;

controls.minPolarAngle = Math.PI * 0.35;

controls.maxPolarAngle = Math.PI * 0.65;





/*==============================
    MODEL
==============================*/

const loader = new GLTFLoader();

let currentModel = null;





function loadModel(path) {

    if (currentModel) {

        scene.remove(currentModel);

        currentModel.traverse((child) => {

            if (child.isMesh) {

                child.geometry.dispose();

            }

        });

    }



    loader.load(

        path,

        (gltf) => {

            currentModel = gltf.scene;



            currentModel.traverse((child) => {

                if (child.isMesh) {

                    child.castShadow = true;

                    child.receiveShadow = true;

                }

            });



            scene.add(currentModel);

        },

        undefined,

        (error) => {

            console.error(error);

        }

    );

}



loadModel("assets/models/featured.glb");





/*==============================
    RESIZE
==============================*/

window.addEventListener("resize", () => {

    const width = canvas.clientWidth;

    const height = canvas.clientHeight;



    camera.aspect = width / height;

    camera.updateProjectionMatrix();



    renderer.setSize(width, height);

});





/*==============================
    ANIMATION
==============================*/

const clock = new THREE.Clock();





function animate() {

    requestAnimationFrame(animate);



    const time = clock.getElapsedTime();



    if (currentModel) {

        currentModel.rotation.y += 0.003;

        currentModel.position.y = Math.sin(time * 2) * 0.05;

    }



    controls.update();

    renderer.render(scene, camera);

}



animate();
