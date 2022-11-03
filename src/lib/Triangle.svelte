<script lang="ts">
    import { getContext, onDestroy, onMount } from "svelte";
    import type { CanvasContext, Rectangle } from "src/types";
    let canvasContext = getContext("canvas") as CanvasContext;
    let size = 500;
    const rectAngle = -1;
    const speed: number = 2;
    onMount(() => {
        canvasContext.addDrawFn(draw);
        for (let i = 0; i < num; i++) {
            rects.push({
                x: Math.random() * document.documentElement.clientWidth,
                y: Math.random() * document.documentElement.clientHeight,
                width: Math.max(200, Math.random() * 600),
                height: Math.max(40, Math.random() * 200),
                angle: rectAngle,
                fill: `rgba(${Math.random() * 55}, ${Math.random() * 55}, ${Math.random() * 55}, ${Math.random()})`, 
                stroke: 'black',

            });
            rects2.push({
                x: Math.random() * document.documentElement.clientWidth,
                y: Math.random() * document.documentElement.clientHeight,
                width: Math.max(200, Math.random() * 600),
                height: Math.max(40, Math.random() * 200),
                angle: rectAngle,
                fill: `rgba(${125}, ${Math.random() * 155}, ${125}, ${Math.random()})`, 
                stroke: 'black',

            });
        }
        
        
    });
    onDestroy(() => {
        canvasContext.removeDrawFn(draw);
    });


    const num = 25;
    let rects: Rectangle[] = [];
    let rects2: Rectangle[] = [];
    const ManyRectangles = (ctx: CanvasRenderingContext2D, rectsArray: Rectangle[]) => {
        rectsArray.forEach((rect) => {
            const {x, y, width, height, angle, fill, stroke} = rect;
            if( x > ctx.canvas.width) {
                rect.x = 0;
            }
            if (y > ctx.canvas.height) {
                rect.y = 0;
            }
            if(x < 0) {
                rect.x = ctx.canvas.width;
            }
            if(y < 0) {
                rect.y = ctx.canvas.height;
            }
            Rectangle({x, y, width, height, angle: angle, fill, stroke}, ctx);
            rect.y +=  Math.cos(angle) * speed * width/200;
            rect.x +=  Math.sin(angle) * speed* width/200;
        });
        
    }

    // draw a skewed rectangle
    const Rectangle = ({x, y, width, height, angle=-1, fill, stroke}: Rectangle, ctx: CanvasRenderingContext2D) => {
        let w, h, rx, ry;
        w = width;
        h = height;
        rx = Math.sin(angle) * w;
        ry = Math.cos(angle) * w;
        
        ctx.save();
        // first translate to center
        ctx.translate(x, y);
        // then translate to the top left corner of the rectangle
        ctx.translate(rx * -.5, (ry + h) * -.5);
        ctx.fillStyle=fill;
        ctx.strokeStyle=stroke;

        ctx.beginPath();
        // top-left corner is [0, 0]
        ctx.moveTo(0, 0);
        ctx.lineTo(rx, ry);
        ctx.lineTo(rx, ry + h);
        ctx.lineTo(0, h);

        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        
        ctx.restore();


    }
    const Triangle = (x: number, y: number, ctx: CanvasRenderingContext2D, size: number) => {
        let w, h;

        w = size;
        h = size;
        ctx.save();
        
        ctx.translate(x, y);
        let gradient = ctx.createLinearGradient(0, w, w, h);
        gradient.addColorStop(0, "purple");
        gradient.addColorStop(1, "orange");
        ctx.fillStyle = gradient;
        ctx.translate(w * -.5, (h) * -.5);
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.lineTo(w, h);
        ctx.lineTo(w/2, 0);
        ctx.closePath();
        // fill ctx with purple to orange gradient
        
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        //countDown();
        // draw a swirl of triangles increasing in size around the smaller one
    }  
    




    const draw = (ctx: CanvasRenderingContext2D) => {
        let canvasX = ctx.canvas.width;
        let canvasY = ctx.canvas.height;
        
        ctx.clearRect(0, 0, canvasX, canvasY);
        ManyRectangles(ctx, rects);
        Triangle(ctx.canvas.width/2, ctx.canvas.height/2, ctx, size);
        ManyRectangles(ctx, rects2);

        
    }
</script>