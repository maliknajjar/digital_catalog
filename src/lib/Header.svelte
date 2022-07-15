<script lang="ts">
    import { onMount } from "svelte";
    import { activeScene, sceneThumbnails, currentClassIndex } from "../store"
    import mahmoud_logo from "../assets/mahmoud_logo.png"

    export let images = []
    let scaledThumbnailIndex = 0

    // running this function when the sceneThumbnails global variable changes
    sceneThumbnails.subscribe(value => {
        images  = value
    })

    // the function that changes the scene when clicking on a scene thumbnail
    function changeActiveScene(sceneIndex) {
        activeScene.set(sceneIndex)
        scaledThumbnailIndex = sceneIndex
        currentClassIndex.set(0)
    }
</script>
  
<header>
    <div class="outer_logo_part">
        <div class="logo_part">
            <img src={mahmoud_logo} height="27" alt="the logo">
        </div>
    </div>
    <div class="outer_Objects_part">
        <div class="inner_Objects_part">
            {#each images as imageURL, i}
                <img class="scene_thumbnail {i == scaledThumbnailIndex ? "active" : ""}" alt="scene_image" src={imageURL} on:click={ () => changeActiveScene(i) }>
            {/each}
        </div>
    </div>
</header>
  
<style>
    header {
        position: absolute;
        width: 100%;
    }

    .outer_logo_part {
        background: radial-gradient(var(--main-color) 60%, var(--main-color-very-light) 100%);
        padding-bottom: 4px;

    }

    .logo_part {
        background-color: white;
        padding: 15px;
        display: flex;
        justify-content: center;
        /* border-bottom: 4px solid var(--main-color); */
    }
    
    .outer_Objects_part {
        background: radial-gradient(var(--main-color) 60%, var(--main-color-very-light) 100%);
        padding-bottom: 4px;
    }
    
    .inner_Objects_part {
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
        gap: 30px;
        padding: 25px 25px;
        background: linear-gradient(rgb(240, 240, 240), white 20%);
    }
    
    .scene_thumbnail {
        box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.075);
        object-fit: cover;
        aspect-ratio: 1;
        width: 100px;
        height: 100px;
        transition: 0.5s;
        cursor: pointer;
        border: 5px transparent solid;
    }

    .scene_thumbnail:hover {
        transform: scale(1.1);
    }

    .active {
        transform: scale(1.1);
        border: 5px var(--main-color-light) solid;
    }

</style>
  