<script lang="ts">
    import { onMount } from 'svelte';
    import { activeScene, sceneThumbnails } from "../store"

    import * as THREE from 'three';
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

    // global variables
    let renderer
    let controls

    // instantiating the scene
    const scene = new THREE.Scene();
    let objects
    // setting a suitable background color
    scene.background = new THREE.Color( 0xeeeeee );

    // adding the camera to the scene
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.x = 2.5;
    camera.position.y = 2.5;
    camera.position.z = 2.5;

    // adding lights or HDRI
    //loading the hdri
    const hdriLoader = new RGBELoader();
    hdriLoader.load('src/hdris/brown_photostudio_01_1k.hdr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping
        scene.background = texture
        scene.environment = texture
    })
    
    // running this code after the component is mount
    onMount(async () => {
        // adding the renderer with antialias turned into true and adjusting some parameteres for photorealism
        const mainCanvas = document.querySelector(".mainCanvas")
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: mainCanvas
        });
        renderer.outputEncoding = THREE.sRGBEncoding
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1
        renderer.setSize( window.innerWidth, window.innerHeight );

        // adding orbit controls
        controls = new OrbitControls( camera, renderer.domElement );

        // taking a picture of the every scene in the app and putting it in the scenes thumbnail
        let isActive = true
        let index = 1
        let renderImages = []

        // loading the first scene to start the loading loop using <DefaultLoadingManager.onLoad> and save it into a global variable
        const loader = new GLTFLoader();
        loader.load( `src/3D_Scenes/0.glb`, function ( gltf ) {
            scene.add(gltf.scene)
            // fitting camera to view
            fitCameraToObjects(camera, controls, scene.children[0].children, 1.5)
        }, undefined, function ( error ) {
            console.error( error );
        } );

        // setting up loading managers (this loads only if all objects are finished loading)
        THREE.DefaultLoadingManager.onLoad = function ( ) {
            // rendering scenes and and saving thumbnails
            if(isActive) {
                renderer.render( scene, camera );
                renderImages.push(renderer.domElement.toDataURL())
            }
            // load all scenes here
            if (isActive) {
                loader.load( `src/3D_Scenes/${index}.glb`, function ( gltf ) {
                    // making the previous scene NOT visible
                    scene.children[index - 1].visible = false
                    // adding the scene
                    scene.add(gltf.scene)
                    // fitting camera to view
                    fitCameraToObjects(camera, controls, scene.children[index].children, 1.5)
                    index++
                }, undefined, function ( error ) {
                    /////////////////////////////////////////////////////////
                    // this is code that runs when all scenes are imported //
                    /////////////////////////////////////////////////////////
                    // displaying error
                    console.error( error );
                    // this is to end the loop
                    isActive = false
                    // setting thumbnails from saved images
                    sceneThumbnails.set(renderImages)
                    // setting the first scene to be the active scene
                    activeScene.set(0)
                } );
            }
        };
        // the animation loop
        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        };
        // invoking the animation loop 
        animate()
	});
    
    // changing the scene when the activeScene variable changes
    let firedOnce = false
    activeScene.subscribe(activeScene => {
        console.log(activeScene)
        if(firedOnce) {
            // fitting camera to view
            fitCameraToObjects(camera, controls, scene.children[activeScene].children, 1.5)
            // showing only objects from selected the scene
            scene.children.forEach((scene, i) => {
                if(i == activeScene) { scene.visible = true; return} 
                scene.visible = false
            });
        }
        firedOnce = true
    })
    
    //////////////////////////////////////////
    //               FUNCTIONS              //
    //////////////////////////////////////////
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    const box = new THREE.Box3();

    function fitCameraToObjects(camera, controls, objects, fitOffset = 1.2) {
        // filtering out the ENV objects
        objects = objects.filter((object) => {
            return !object.name.includes("ENV")
        })

        box.makeEmpty();
        for(const object of objects) {
            box.expandByObject(object);
        }
        
        box.getSize(size);
        box.getCenter(center );
        
        const maxSize = Math.max(size.x, size.y, size.z);
        const fitHeightDistance = maxSize / (2 * Math.atan(Math.PI * camera.fov / 360));
        const fitWidthDistance = fitHeightDistance / camera.aspect;
        const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);
        
        const direction = controls.target.clone()
            .sub(camera.position)
            .normalize()
            .multiplyScalar(distance);

        controls.maxDistance = distance * 10;
        controls.target.copy(center);
        
        camera.near = distance / 100;
        camera.far = distance * 100;
        camera.updateProjectionMatrix();

        camera.position.copy(controls.target).sub(direction);
        
        controls.update();
    }
</script>

<canvas class="mainCanvas"></canvas>
  
<style>
    
</style>