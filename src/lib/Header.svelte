<script lang="ts">
    import mahmoud_logo from "../assets/mahmoud_logo.png"
</script>
  
<header>
    <div class="logo_part">
        <img src={mahmoud_logo} height="27" alt="the logo">
    </div>
    <div class="outer_Objects_part">
        <div class="inner_Objects_part">
            <div class="object_thumbnail"></div>
            <div class="object_thumbnail"></div>
            <div class="object_thumbnail"></div>
            <div class="object_thumbnail"></div>
            <div class="object_thumbnail"></div>
            <div class="object_thumbnail"></div>
            <div class="object_thumbnail"></div>
            <div class="object_thumbnail"></div>
            <div class="object_thumbnail"></div>
            <div class="object_thumbnail"></div>
            <div class="object_thumbnail"></div>
            <div class="object_thumbnail"></div>
            <div class="object_thumbnail"></div>
            <div class="object_thumbnail"></div>
        </div>
    </div>
</header>
  
<style>
    .logo_part {
        background-color: white;
        padding: 15px;
        display: flex;
        justify-content: center;
        border-bottom: 4px solid var(--main-color);
        background: linear-gradient(rgb(235, 235, 235), white);
    }
    
    .outer_Objects_part {
        background-color: var(--main-color);
        padding-bottom: 4px;
    }
    
    .inner_Objects_part {
        /* overflow: auto; */
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
        gap: 20px;
        padding: 20px;
        background-color: white;
        background: linear-gradient(rgb(235, 235, 235), white);
    }
    
    .object_thumbnail {
        background-color: blue;
        aspect-ratio: 1;
        width: 100px;
        height: 100px;
    }
</style>
  