<!-- Triangle demo -->
<script lang="ts">
    import Canvas from "$lib/Canvas.svelte";
	import Line from "$lib/Line.svelte";
	import Triangle from "$lib/Triangle.svelte";
	import type { Point } from "src/types";
    import { onMount } from "svelte";

    console.log("App: Initialized");
    onMount (() => {
        console.log("App: mounted");

    });


    
</script>
<main>
    <Canvas>
        <Triangle />
    </Canvas>
</main>

