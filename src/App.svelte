<script lang="ts">
  import "./global.css"
  
  import Header from "./lib/Header.svelte"
  import Footer from "./lib/Footer.svelte"
  import Canvas3D from "./lib/Canvas3D.svelte"
  import LoadingScreen from "./lib/LoadingScreen.svelte"
</script>

<main>
  <Header />
  <Canvas3D />
  <Footer />
  <LoadingScreen />
</main>
