<script lang="ts">
    import { onMount } from 'svelte';
    import { activeScene, sceneThumbnails } from "./stores"

    import * as THREE from 'three';
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

    // global variables
    let renderer

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
        const controls = new OrbitControls( camera, renderer.domElement );

        // taking a picture of the every scene in the app and putting it in the scenes thumbnail
        let isActive = true
        let index = 1
        let renderImages = []

        // loading the first scene to start the loading loop using <DefaultLoadingManager.onLoad> and save it into a global variable
        const loader = new GLTFLoader();
        loader.load( `src/3D_Scenes/0.glb`, function ( gltf ) {
            scene.add(gltf.scene)
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
                    index++
                }, undefined, function ( error ) {
                    console.error( error );
                    isActive = false
                    // setting thumbnails from saved images
                    sceneThumbnails.set(renderImages)
                    // setting the first scene to be the active scene
                    scene.children.forEach((scene, i) => {
                        if(i == 0) { scene.visible = true; return } 
                        scene.visible = false
                    });
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
    activeScene.subscribe(activeScene => {
        scene.children.forEach((scene, i) => {
            if(i == activeScene) { scene.visible = true; return} 
            scene.visible = false
        });
    })
</script>

<canvas class="mainCanvas"></canvas>
  
<style>
    
</style>