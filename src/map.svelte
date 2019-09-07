<script>
  import { images, getImages } from "./store.js";
  import { onMount } from "svelte";

  let canvas;
  let ctx;

  let myCoords = { x: 0, y: 0 };

  onMount(() => {
    ctx = canvas.getContext("2d");
  });

  images.subscribe(imgs => {
    render();
  });

  function render() {
    $images.map(img => {
      ctx.drawImage(img, 0, 0);
    });
  }

  getImages(1);
</script>

<style>
  canvas {
    width: 100vh;
    height: 100vh;
    background-color: black;
  }
</style>

<canvas width="800" height="800" bind:this={canvas} />
