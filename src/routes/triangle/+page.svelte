<!-- Triangle demo -->
<script lang="ts">
    import Canvas from "$lib/Canvas.svelte";
	import Triangle from "$lib/Triangle.svelte";
    import { onMount } from "svelte";

    console.log("App: Initialized");
    onMount (() => {
        console.log("App: mounted");

    });

    
</script>
<main id="main">
    <Canvas>
        <Triangle />
    </Canvas>
</main>

<style>
    #main {
        position: absolute;
        top: 0;
        left: 0;


    }
</style>