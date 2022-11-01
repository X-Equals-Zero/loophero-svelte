<script lang="ts">
    import { onMount } from "svelte";
    let canvasElement: HTMLCanvasElement;
    console.log("Canvas: initialized");
    onMount(() => {
        console.log("Canvas: mounted");
        // get canvas context
        let ctx = canvasElement.getContext("2d");
        drawLine(ctx, [10, 20], [150, 100]);
        drawLine(ctx, [10, 40], [150, 120]);
    });

    type Point = [number, number];
    const drawLine = (ctx: CanvasRenderingContext2D | null, start: Point, end: Point) => {
        if(ctx){
            // draw first line
            ctx.beginPath();
            ctx.moveTo(...start); // line starts here
            ctx.lineTo(...end); // line ends here
            ctx.stroke(); // draws it
        }
    }
</script>
<canvas bind:this={canvasElement} />