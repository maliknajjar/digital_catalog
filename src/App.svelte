<script lang="ts">
  import "./global.css"
  
  import Header from "./lib/Header.svelte"
  import Footer from "./lib/Footer.svelte"
  import Canvas3D from "./lib/Canvas3D.svelte"

  let images;

  function setScenesThumbnailImages(array) {
    images = array
  }
</script>

<main>
  <Header images={images} />
  <Canvas3D setScenesThumbnailImages={setScenesThumbnailImages} />
  <Footer />
</main>
