<script lang="ts">
    import { classTree, activeScene, everyClassesIndex, currentClass } from "../store"

    let Tree;
    let objectsClasses = [];
    let currentObjects = {};

    let isFired = false;
    activeScene.subscribe((value) => {
        if (isFired == false) {
            isFired = true
        } else {
            // add code here that happens when the scene changes
            if (Tree[value] == undefined) return
            objectsClasses = Object.keys(Tree[value])
            currentObjects = Tree[value]
            currentClass.set(objectsClasses[0])
        }
    })
    
    classTree.subscribe((value) => {
        Tree = value
        if (Tree[0] == undefined) return
        objectsClasses = Object.keys(Tree[0])
        currentClass.set(objectsClasses[0])
        currentObjects = Tree[0]
    })

    function changeClass(theClass) {
        if(theClass == currentClass) return
        currentClass.set(theClass)
    }
</script>
  
<footer class="bolder">
    <div class="outer_navigation_control">
        <div class="inner_navigation_control">
            <!-- these are some examples of the classes -->
            {#each objectsClasses as objectsClasse}
                <div on:click={() => {changeClass(objectsClasse) }} class="{objectsClasse == $currentClass ? "selectedClass" : ""}" style="cursor: pointer;">{objectsClasse}</div>
            {/each}
        </div>
    </div>
    <div class="outer_piece_propreties_control">
        <div class="inner_piece_propreties_control">
            {#if $currentClass == ""}
                loading
            {:else}
                {#if Array.isArray(currentObjects[$currentClass])}
                    {#each currentObjects[$currentClass] as object, i}
                        <img on:click={() => { $everyClassesIndex[$activeScene][$currentClass] = i }} class="propreties_control_thumbnail" style="{$everyClassesIndex[$activeScene][$currentClass] == i ? "transform: scale(1.1);" : ""}" alt="thumbnail" src="{object.image}">  
                    {/each}
                {:else}
                    there are no classes
                {/if}
            {/if}
        </div>
    </div>
</footer>
  
<style>
    footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    .bolder {
        font-weight: bolder;
    }
    
    .outer_navigation_control {
        background: radial-gradient(var(--main-color) 25%, var(--main-color-very-light) 125%);
        padding: 4px;
        padding-bottom: 0px;
    }
    
    .outer_piece_propreties_control {
        background: radial-gradient(var(--main-color) 60%, var(--main-color-very-light) 100%);
        padding: 4px 0 0 0;
        width: 100%;
    }

    .inner_navigation_control {
        display: flex;
        gap: 25px;
        background-color: white;
        padding: 15px 20px;
        font-weight: bolder;
        color: var(--unselected-font-color);
    }

    .inner_piece_propreties_control {
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
        gap: 30px;
        padding: 20px;
        background: linear-gradient(white, rgb(230, 230, 230));
    }

    .propreties_control_thumbnail {
        background-color: white;
        box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.075);
        aspect-ratio: 1;
        width: 90px;
        height: 90px;
        transition: 0.5s;
        cursor: pointer;
        border: none;
        object-fit: cover;
    }

    .selectedClass {
        color: var(--selected-font-color);
        cursor: pointer;
    }

    .propreties_control_thumbnail:hover {
        transform: scale(1.1);
    }

</style>