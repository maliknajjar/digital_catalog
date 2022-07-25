<script lang="ts">
    import { activeScene, sceneThumbnails, everyClassesIndex, currentClass, isUIhidden } from "../store"
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
    }

    // UI hide toggle handler
    function uiButtonHandler() {
        $isUIhidden = !$isUIhidden
    }
</script>
  
<header>
    <div class="outer_logo_part">
        <div class="logo_part">
            <img src={mahmoud_logo} height="27" alt="the logo">
        </div>
    </div>
    {#if !$isUIhidden}
        <div class="outer_Objects_part">
            <div class="inner_Objects_part">
                {#each images as imageURL, i}
                    <img class="scene_thumbnail {i == scaledThumbnailIndex ? "active" : ""}" alt="scene_image" src={imageURL} on:click={ () => changeActiveScene(i) }>
                {/each}
            </div>
        </div>
    {/if}
    <div class="hideButton">
        <div on:click={uiButtonHandler} class="theButton">{!$isUIhidden ? "Hide UI" : "Show UI"}</div>
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
        overflow: auto;
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
    }

    .active {
        transform: scale(1.15);
    }

    .hideButton {
        display: flex;
        margin: 15px;
    }
    
    .theButton {
        background-color: white;
        padding: 10px 15px;
        color: rgb(26, 26, 26);
        cursor: pointer;
    }

    .theButton:hover {
        background-color: rgb(255, 234, 190);
    }

</style>
  