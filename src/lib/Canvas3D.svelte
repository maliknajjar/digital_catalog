<script lang="ts">
    import * as THREE from 'three';
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

    // instantiating the scene
    const scene = new THREE.Scene();
    let objects
    // setting a suitable background color
    scene.background = new THREE.Color( 0xeeeeee );

    // adding the camera to the scene
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;

    // adding the renderer with antialias turned into true and adjusting some parameteres for photorealism
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    // adding orbit controls
    const controls = new OrbitControls( camera, renderer.domElement );

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
    loader.load( 'src/3D_Scenes/box_scene.glb', function ( gltf ) {
        scene.add(gltf.scene)
        objects = scene.children[0].children
    }, undefined, function ( error ) {
        console.error( error );
    } );
    
    // looping through all meshes
    objects.forEach(object => {
        console.log(object.name)
    });
    
    // the animation loop
    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    };
    animate();
    
</script>
  
<style>
    
</style>