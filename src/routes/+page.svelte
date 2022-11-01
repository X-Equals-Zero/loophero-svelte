<!-- https://www.thisdot.co/blog/declarative-canvas-with-svelte -->
<script lang="ts">
    import Canvas from "$lib/Canvas.svelte";
    import { onMount } from "svelte";
    

    console.log("App: Initialized");
    onMount (() => {
        console.log("App: mounted");
    })
</script>
<main>
    <Canvas />
</main>