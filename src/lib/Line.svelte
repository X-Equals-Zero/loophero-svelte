<script lang="ts">
    import type { Point, CanvasContext } from "src/types";
	import { getContext, onDestroy, onMount } from "svelte";
    export let start: Point;
    export let end: Point;

    let canvasContext = getContext("canvas") as CanvasContext;

    onMount(()=> {
        canvasContext.addDrawFn(draw);

    });
    onDestroy(() => {
        canvasContext.removeDrawFn(draw);
    });
    
    const draw = (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        ctx.moveTo(...start);
        ctx.lineTo(...end);
        ctx.stroke();
}
</script>