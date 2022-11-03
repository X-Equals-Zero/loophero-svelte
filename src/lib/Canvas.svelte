<script lang="ts">
	import type { DrawFn } from "src/types";
    import { getContext, onDestroy, onMount, setContext } from "svelte";
    console.log("Canvas: initialized");
    let canvasElement: HTMLCanvasElement;
    let fnsToDraw = [] as DrawFn[];
    let frameId: number;
    const clearFrames: boolean = false;
    
    setContext("canvas", {
        addDrawFn: (fn: DrawFn) => {
            fnsToDraw.push(fn);
        },
        removeDrawFn: (fn: DrawFn) => {
            let index = fnsToDraw.indexOf(fn);
            if (index > -1) {
                fnsToDraw.splice(index, 1);

            }
        },


    });

    onMount(() => {
        console.log("Canvas: mounted");
        // get canvas context
        let ctx = canvasElement.getContext("2d");
        canvasElement.width = document.documentElement.clientWidth;
        canvasElement.height = document.documentElement.clientHeight;
        
        frameId = requestAnimationFrame(() => ctx && draw(ctx))
    });
    onDestroy(() => {
        if (frameId) {
            cancelAnimationFrame(frameId);
        }
    });

    const draw = (ctx: CanvasRenderingContext2D) => {
        if (clearFrames) {
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        }
        fnsToDraw.forEach(fn => fn(ctx));
        frameId = requestAnimationFrame(() => draw(ctx));

    }

</script>
<canvas on:mousemove on:mouseleave bind:this={canvasElement} />
<slot />
