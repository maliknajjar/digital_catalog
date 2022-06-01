<script lang="ts">
    import * as THREE from 'three';
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

    // instantiating the scene
    const scene = new THREE.Scene();
    // setting a suitable background color
    scene.background = new THREE.Color( 0xeeeeee );

    // adding the camera to the scene
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;

    
    // adding ambient light
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);
    
    // adding the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // adding orbit controls
    const controls = new OrbitControls( camera, renderer.domElement );
    
    // loading a specific 3d scene 
    const loader = new GLTFLoader();
    loader.load( 'src/3D_Scenes/box_scene.glb', function ( gltf ) {
        // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        // gltf.scene.children[0].material = material
        console.log(gltf.scene.children[0])
        scene.add( gltf.scene );
    }, undefined, function ( error ) {
        console.error( error );
    } );
    
    // the animation loop
    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    };
    animate();
    
</script>
  
<div></div>
  
<style>
    
</style>