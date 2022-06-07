<script lang="ts">
    import { onMount } from 'svelte';

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

    // loading a specific 3d scene from gltf file
    const loader = new GLTFLoader();
    loader.load( 'src/3D_Scenes/1.glb', function ( gltf ) {
        scene.add(gltf.scene)
        objects = scene.children[0].children
        // looping through all meshes
        objects.forEach(object => {
            console.log(object.name)
        });
    }, undefined, function ( error ) {
        console.error( error );
    } );
    
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
        THREE.DefaultLoadingManager.onLoad = function ( ) {        // setting up loading managers (this loads only if all objects are finished loading)
            renderer.render( scene, camera );
            (<HTMLImageElement>document.querySelector('.scene_thumbnail')).src = renderer.domElement.toDataURL()
        };
        
        // the animation loop
        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
        };
	});
</script>

<canvas class="mainCanvas"></canvas>
  
<style>
    
</style>