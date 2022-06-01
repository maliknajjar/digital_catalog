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

    // adding lights
    // adding point light
    const pointLight = new THREE.PointLight( 0xffffff, 2, 100 );
    pointLight.position.set( 2, 2, 2 );
    scene.add( pointLight );
    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
    scene.add( pointLightHelper );
    // adding ambient light
    const light = new THREE.AmbientLight(0xFFFFFF, 0.5);
    scene.add(light);

    // adding the renderer with antialias turned into true
    const renderer = new THREE.WebGLRenderer({antialias: true});
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