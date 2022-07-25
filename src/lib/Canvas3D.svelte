<script lang="ts">
    import { onMount } from 'svelte';
    import { activeScene, sceneThumbnails, classTree, everyClassesIndex, currentClass, isLoading } from "../store"

    import * as THREE from 'three';
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

    // global variables
    let renderer
    let controls
    let theActiveScene
    let tree = []

    // instantiating the scene
    const scene = new THREE.Scene();
    let objects
    // setting a suitable background color
    let bgColor = new THREE.Color( 0xeeeeee );
    let classedObjectThumbnailBG = new THREE.Color( 0xffffff )
    scene.background = bgColor

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
        // scene.background = texture
        scene.environment = texture
    })
    
    // running this code after the component is mount
    onMount(async () => {
        // adding the renderer with antialias turned into true and adjusting some parameteres for photorealism
        const mainCanvas = document.querySelector(".mainCanvas")
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            // this option makes the app able to store an image from the renderer
            preserveDrawingBuffer: true,
            canvas: mainCanvas
        });
        renderer.outputEncoding = THREE.sRGBEncoding
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1
        renderer.setSize( window.innerWidth, window.innerHeight );

        // adding orbit controls
        controls = new OrbitControls( camera, renderer.domElement );
        
        // the thing responsible for smooth animation
        controls.enableDamping = true;
        controls.dampingFactor = 0.15;

        // taking a picture of the every scene in the app and putting it in the scenes thumbnail
        let isActive = true
        let index = 1
        let renderImages = []

        // loading the first scene to start the loading loop using <DefaultLoadingManager.onLoad> and save it into a global variable
        const loader = new GLTFLoader();
        loader.load( `src/3D_Scenes/0.glb`, function ( gltf ) {
            scene.add(gltf.scene)
            // fitting camera to view
            fitCameraToObjects(camera, controls, scene.children[0].children)
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
                    fitCameraToObjects(camera, controls, scene.children[index].children)
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
                    // invoking the initClassSystem
                    initClassSystem()
                } );
            }
        };
        // the animation loop
        function animate() {
            requestAnimationFrame( animate );
            renderer.render( scene, camera );
            controls.update();      // only required if controls.enableDamping = true, or if controls.autoRotate = true
        };
        // invoking the animation loop 
        animate()
	});
    
    // changing the scene when the activeScene variable changes
    let firedOnce = false
    activeScene.subscribe(activeScene => {
        
        if(firedOnce) {
            // showing only objects from selected the scene
            switchScene(activeScene)
            // fitting camera to view
            fitCameraToObjects(camera, controls, scene.children[activeScene].children)
        }
        firedOnce = true
        theActiveScene = activeScene
        
    })

    everyClassesIndex.subscribe((value) => {
        if(tree[theActiveScene] == undefined) return
        // show only one object from one class
        let objects = tree[theActiveScene][$currentClass]
        if (objects == undefined) return 
        let object = tree[theActiveScene][$currentClass][value[theActiveScene][$currentClass]]
        objects.forEach(element => {
            if (element.refrence.uuid == object.refrence.uuid) {
                element.refrence.visible = true
                return
            } else {
                element.refrence.visible = false
            }
        });
    })
    
    //////////////////////////////////////////
    //               FUNCTIONS              //
    //////////////////////////////////////////
    function switchScene(sceneID) {
        scene.children.forEach((scene, i) => {
            if(i == sceneID) { scene.visible = true; return} 
            scene.visible = false
        });
    }

    async function initClassSystem() {
        scene.background = classedObjectThumbnailBG;     // changing the color of the background of the classed object thumbnail
        let timeToWait = 25
        let theScenes = scene.children
        for (let sceneIndex = 0; sceneIndex < theScenes.length; sceneIndex++) {
            let sceneObjects = theScenes[sceneIndex].children
            let classes = {}
            for (let index = 0; index < sceneObjects.length; index++) {
                const theObject = sceneObjects[index];
                if(theObject.name.includes("-")){
                    showOnlyOneObject(theObject)
                    // showing the background again after we made only the classed object visible
                    fitCameraToObjects(camera, controls, [theObject], 1.5)
                    // saving the picture of the tree variable
                    let objectInfo = {}
                    const objectSplitted = theObject.name.split("-")
                    objectInfo["name"] = objectSplitted[0]
                    objectInfo["class"] = objectSplitted[1]
                    await sleep(timeToWait)
                    objectInfo["image"] = renderer.domElement.toDataURL()
                    objectInfo["refrence"] = theObject
                    if(!Array.isArray(classes[objectSplitted[1]])) classes[objectSplitted[1]] = []
                    classes[objectSplitted[1]].push(objectInfo)
                }
            }
            // turning all objects' visibility back into true
            for (let index = 0; index < sceneObjects.length; index++) {
                const theObject = sceneObjects[index];
                theObject.visible = true
            }
            tree.push(classes)
        }
        // making only the first classed object visible
        tree.forEach((element) => {
            Object.values(element).forEach((object: Array<any>) => {
                object.forEach((obj, i) => {
                    if (i == 0) obj.refrence.visible = true
                    else obj.refrence.visible = false
                });
            })
        })
        // building the $everyClassesIndex variable
        tree.forEach((e, sceneIndex) => {
            let object = {}
            let keys = Object.keys(e)
            keys.forEach((key) => {
                object[key] = 0
            })
            $everyClassesIndex[sceneIndex] = object
        })
        classTree.set(tree)
        // switching back to the first scene
        activeScene.set(0)
        // retrieving the original background color
        scene.background = bgColor
        isLoading.set(false)
    }

    /**
     * this function hides every thing and shows only one specific object
    */
    function showOnlyOneObject(object) {
        // hide all things in the scene
        scene.children.forEach(scenes => {
            scenes.visible = false
        })
        object.parent.visible = true
        object.parent.children.forEach((object) => {
            object.visible = false
        });
        // show only the wanted object
        object.visible = true
    }
    
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    const box = new THREE.Box3();

    function fitCameraToObjects(camera, controls, objects, fitOffset = 2) {
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

    /*
        this function mimics the sleep function in python or c (make sure to use it in an async function and add await before the functin)
    */
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
</script>

<canvas class="mainCanvas"></canvas>
  
<style>
    
</style>