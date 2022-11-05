<!-- https://www.thisdot.co/blog/declarative-canvas-with-svelte -->
<script lang="ts">
    import Canvas from "$lib/Canvas.svelte";
	import Line from "$lib/Line.svelte";
	import type { Point } from "src/types";
    import { onMount } from "svelte";

    console.log("App: Initialized");
    onMount (() => {
        console.log("App: mounted");

    });
    const followMouse = (e: MouseEvent) => {
        let target = e.target as Element;
        let rect = target.getBoundingClientRect();
        end = [e.clientX - rect.left, e.clientY - rect.top]

    }
    let start = [0, 0] as Point;
    let end = [0, 0] as Point;
</script>
<main>
    <Canvas
    on:mousemove={(e) => followMouse(e)}
    on:mouseleave={() => end = [0, 0]}>
        <Line {start} {end} />
        <Line {start} {end} />
    </Canvas>
</main>

<style>
    main {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>