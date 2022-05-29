<script lang="ts">
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xeeeeee );

    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const loader = new GLTFLoader();
    loader.load( 'src/3D_Scenes/box_scene.glb', function ( gltf ) {
        console.log(gltf.scene)
        scene.add( gltf.scene );
    }, undefined, function ( error ) {
        console.error( error );
    } );
    
    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    };

    animate();
</script>
  
<div></div>
  
<style>
    
</style>