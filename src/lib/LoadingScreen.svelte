<script lang="ts">
    import { isLoading } from "../store"
    import loadingGif from "../assets/loading.gif"
</script>
  
{#if $isLoading == true}
<div class="loadingBG">
    <img src={loadingGif} alt="" width="140">
    <div class="text">Loading</div>
</div>
{/if}
  
<style>
    .loadingBG {
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgb(241, 241, 241);
        top: 0;
    }

    .text {
        font-size: 42px;
        font-style: italic;
        font-weight: bolder;
        color: rgb(66, 66, 66);
        margin-top: 20px;
    }
</style>