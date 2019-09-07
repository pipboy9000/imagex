<script>
  export let name;
  import Map from "./map.svelte";
</script>

<style>
  :global(body) {
    /* this will apply to <body> */
    margin: 0;
    padding: 0;
  }
</style>

<Map />
