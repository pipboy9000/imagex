<script>
  import { hexes } from "./store.js";
  import { onMount } from "svelte";
  import { defineGrid, extendHex } from "honeycomb-grid";

  const hex = extendHex({ size: 100 });
  const Grid = defineGrid(hex);

  let grid = Grid.hexagon({ radius: 0 });

  let canvas;
  let ctx;

  let myCoords = { x: 0, y: 0 };
  let drag = false;
  let dragStart;

  onMount(() => {
    ctx = canvas.getContext("2d");
    requestAnimationFrame(render);
  });

  hexes.subscribe(h => {
    buildGrid();
  });

  function buildGrid() {
    if (!$hexes || $hexes.length == 0) {
      return;
    }

    $hexes.map(({ x, y }) => {
      grid.set([x, y], Grid.Hex({ x, y }));
    });

    requestAnimationFrame(render);
  }

  function render() {
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "black";

    //clear screen
    ctx.fillRect(0, 0, 800, 800);

    //draw hex and text
    grid.forEach(hex => {
      let { x, y } = hex.toPoint();

      let hexCenter = {
        x: x + hex.center().x - myCoords.x,
        y: y + hex.center().y + myCoords.y
      };

      let corners = hex.corners();

      //draw text
      ctx.textAlign = "center";
      ctx.font = "italic 18px Arial";

      ctx.beginPath();
      ctx.arc(hexCenter.x, hexCenter.y, 5, 0, Math.PI * 2);

      ctx.fillStyle = "red";
      ctx.fillText("q:" + hex.cube().q, hexCenter.x, hexCenter.y + 30);

      ctx.fillStyle = "yellow";
      ctx.fillText("r:" + hex.cube().r, hexCenter.x - 20, hexCenter.y - 20);

      ctx.fillStyle = "orange";
      ctx.fillText("s:" + hex.cube().s, hexCenter.x + 20, hexCenter.y - 20);

      ctx.moveTo(corners[0].x + x - myCoords.x, corners[0].y + y + myCoords.y);

      for (var i = 0; i < corners.length; i++) {
        ctx.lineTo(
          corners[i].x + x - myCoords.x,
          corners[i].y + y + myCoords.y
        );
      }
      ctx.closePath();
      ctx.stroke();
    });
  }

  function mouseDown(e) {
    drag = true;
    dragStart = { x: e.clientX, y: e.clientY };
  }

  function mouseUp() {
    drag = false;
  }

  function mouseMove(e) {
    if (drag) {
      myCoords = {
        x: myCoords.x + dragStart.x - e.clientX,
        y: myCoords.y + e.clientY - dragStart.y
      };

      dragStart = {
        x: e.clientX,
        y: e.clientY
      };

      requestAnimationFrame(render);
    }
  }
</script>

<style>
  canvas {
    width: 100vh;
    height: 100vh;
    background-color: black;
  }
</style>

<canvas
  width="800"
  height="800"
  bind:this={canvas}
  on:mousemove={mouseMove}
  on:mousedown={mouseDown}
  on:mouseup={mouseUp} />
