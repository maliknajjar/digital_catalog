<script lang="ts">

</script>
  
<footer>
    <div class="outer_navigation_control">
        <div class="inner_navigation_control">
            <div>Base cabinets</div>
            <div>Wall cabinets</div>
            <div>Worktops</div>
            <div>Sinks</div>
        </div>
    </div>
    <div class="outer_piece_propreties_control">
        <div class="inner_piece_propreties_control">
            <div class="propreties_control_thumbnail"></div>
            <div class="propreties_control_thumbnail"></div>
            <div class="propreties_control_thumbnail"></div>
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
    
    .outer_navigation_control {
        background-color: var(--main-color);
        padding: 4px;
        padding-bottom: 0px;
    }
    
    .outer_piece_propreties_control {
        background-color: var(--main-color);
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
    }

    .propreties_control_thumbnail:hover {
        transform: scale(1.1);
    }
</style>