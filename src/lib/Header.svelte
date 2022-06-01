<script lang="ts">
    import mahmoud_logo from "../assets/mahmoud_logo.png"
</script>
  
<header>
    <div class="outer_logo_part">
        <div class="logo_part">
            <img src={mahmoud_logo} height="27" alt="the logo">
        </div>
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
    header {
        position: absolute;
        width: 100%;
    }

    .outer_logo_part {
        background: radial-gradient(var(--main-color-light) 60%, rgba(234, 152, 81, 0.07) 100%);
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
        background: radial-gradient(var(--main-color) 60%, rgba(234, 152, 81, 0.07) 100%);
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
    
    .object_thumbnail {
        background-color: white;
        box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.075);
        aspect-ratio: 1;
        width: 100px;
        height: 100px;
        transition: 0.5s;
        cursor: pointer;
    }

    .object_thumbnail:hover {
        transform: scale(1.1);
    }

</style>
  