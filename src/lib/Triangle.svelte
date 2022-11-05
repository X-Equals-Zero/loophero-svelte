<script lang="ts">
    import { getContext, onDestroy, onMount } from "svelte";
    import type { CanvasContext, Rectangle } from "src/types";
    let canvasContext = getContext("canvas") as CanvasContext;
    let size = 500;
    const rectAngle = -1;
    const speed: number = 2;
    let canvasX: number, canvasY: number;
    const bgColor = `rgba(${55}, ${Math.random() * 155}, ${125}, 1)`;
    onMount(() => {
        canvasX = document.documentElement.clientWidth;
        canvasY = document.documentElement.clientHeight;
        canvasContext.addDrawFn(draw);
        
        for (let i = 0; i < num; i++) {
            rects.push({
                x: Math.random() * canvasX,
                y: Math.random() * canvasY,
                width: Math.max(600, Math.random() * canvasX),
                height: Math.max(40, Math.random() * 200),
                angle: rectAngle,
                fill: `rgba(${55}, ${Math.random() * 155}, ${125}, 1)`, 
                stroke: `rgba(${125}, ${Math.random() * 155}, ${125}, 1)`,
                direction: 'right',

            });
            rects2.push({
                x: Math.random() * canvasX,
                y: Math.random() * canvasY,
                width: Math.max(600, Math.random() * canvasX),
                height: Math.max(40, Math.random() * 200),
                angle: rectAngle,
                fill: `rgba(${55}, ${Math.random() * 155}, ${125}, 1)`, 
                stroke: `rgba(${125}, ${Math.random() * 155}, ${125}, 1)`,
                direction: 'left',

            });
        }
        
        
    });
    onDestroy(() => {
        canvasContext.removeDrawFn(draw);
    });


    const num = 35;
    let rects: Rectangle[] = [];
    let rects2: Rectangle[] = [];
    const ManyRectangles = (ctx: CanvasRenderingContext2D, rectsArray: Rectangle[]) => {
        rectsArray.forEach((rect) => {
            const {x, y, width, height, angle, fill, stroke, direction='left'} = rect;
            if( x > canvasX + width) {
                rect.x = 0 - width + 1;
            }
            if (y > canvasY + height) {
                rect.y = 0 - height + 1;
            }
            if(x < 0 - width) {
                rect.x = canvasX + width - 1;
            }
            if(y < 0 - height) {
                rect.y = canvasY + height - 1;
            }
            Rectangle({x, y, width, height, angle: angle, fill, stroke, direction}, ctx);
            
            rect.y +=  Math.cos(angle) * speed * width/200 * (direction === 'left' ? -1 : 1) ;
            rect.x +=  Math.sin(angle) * speed* width/200 * (direction === 'left' ? -1 : 1);
        });
        
    }

    // function to draw polygon with N sides to canvas
    const drawPolygon = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, sides: number, startAngle: number, anticlockwise: boolean) => {
        if (sides < 3) return;
        let a = (Math.PI * 2)/sides;
        a = anticlockwise?-a:a;
        ctx.save();
        let gradient = ctx.createLinearGradient(0, 0, radius, radius);
        gradient.addColorStop(0, "purple");
        gradient.addColorStop(1, "orange");
        ctx.fillStyle = gradient;
        ctx.lineWidth = 10;
        ctx.translate(x,y);
        ctx.rotate(startAngle);
        ctx.moveTo(radius,0);
        for (let i = 1; i < sides; i++) {
            ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    // const luminance(): add luminance to rgba color
    const luminance = (color: string, lum: number) => {
        // validate hex string
        color = String(color).replace(/[^0-9a-f]/gi, '');
        if (color.length < 6) {
            color = color[0]+color[0]+color[1]+color[1]+color[2]+color[2];
        }
        lum = lum || 0;
        // convert to decimal and change luminosity
        let rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(color.substr(i*2,2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00"+c).substr(c.length);
        }
        return rgb;
    }
    // function to convert hexademical color to rgba
    const hexToRgba = (hex: string, alpha: number) => {
        let r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // draw a skewed rectangle
    const Rectangle = ({x, y, width, height, angle=-1, fill, stroke}: Rectangle, ctx: CanvasRenderingContext2D) => {
        let w, h, rx, ry;
        w = width;
        h = height;
        rx = Math.sin(angle) * w;
        ry = Math.cos(angle) * w;
        let shadowColor;
        
        ctx.save();
        
        // first translate to center
        ctx.translate(x, y);
        // then translate to the top left corner of the rectangle
        ctx.translate(rx * -.5, (ry + h) * -.5);
        ctx.globalCompositeOperation = 'overlay';
        ctx.fillStyle=fill;
        ctx.strokeStyle=stroke;

        ctx.beginPath();
        // top-left corner is [0, 0]
        ctx.moveTo(0, 0);
        ctx.lineTo(rx, ry);
        ctx.lineTo(rx, ry + h);
        ctx.lineTo(0, h);

        ctx.closePath();
        ctx.lineWidth = 10;
        
        //set shadowColor to HSLA with random hue, 50% saturation, 50% lightness, and 0.5 alpha
        
        // insert #00000 for shadowColor


        shadowColor = hexToRgba(luminance(fill, 0.6), 0.8);
        ctx.shadowColor = shadowColor;
        
        ctx.shadowOffsetX = 20;
        ctx.shadowOffsetY = 10;
        ctx.fill();
        ctx.shadowColor = null as unknown as string;
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.stroke();
        
        
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
        ctx.fill();
        ctx.translate(w * -.5, (h) * -.5);
        ctx.beginPath();
        ctx.moveTo(0, h);
        ctx.lineTo(w, h);
        ctx.lineTo(w/2, 0);
        ctx.closePath();
        // fill ctx with purple to orange gradient
        ctx.shadowColor = "black";
        ctx.shadowOffsetX = -10;
        ctx.shadowOffsetY = 20;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        //countDown();
        // draw a swirl of triangles increasing in size around the smaller one
    }  
    




    const draw = (ctx: CanvasRenderingContext2D) => {
        ctx.save();
        ctx.clearRect(0, 0, canvasX, canvasY);
        ctx.restore();
        ctx.save();
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvasX, canvasY);
        ctx.restore();
        
        ManyRectangles(ctx, rects);
        drawPolygon(ctx, canvasX/2, canvasY/2, 300, 4, 0, false);
        //Triangle(canvasX/2, canvasY/2, ctx, size);
        ManyRectangles(ctx, rects2);
        

        
    }
</script>
