import {Vector} from "./Vector";

export class Viewport {
    constructor(element, canvas) {
        this.canvas = canvas;
        canvas.width = element.clientWidth;
        canvas.height = element.clientHeight;
        this.width = canvas.width;
        this.height = canvas.height;
        // window.addEventListener("resize", (e) => {
        //     canvas.width = document.body.innerWidth;
        //     canvas.height = document.body.clientHeight;
        //     this.draw();
        // });
        this.charges = [];
        this.fences = [];
    }

    draw() {
        let ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "rgba(32, 32, 32, 255)";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.strokeStyle = "white";
        this.fences.forEach((fence) => {
            ctx.beginPath();
            ctx.moveTo(fence.start.x, fence.start.y);
            ctx.lineTo(fence.end.x, fence.end.y);
            ctx.stroke();
        });

        this.charges.forEach((charge) => {
            if (charge.charge < 0) {
                ctx.strokeStyle = "rgba(0, 128, 0, 255)";
            } else {
                ctx.strokeStyle = "rgba(128, 0, 0, 255)";
            }

            if (!charge.isAnchor) {
                ctx.beginPath();
                ctx.arc(charge.position.x, charge.position.y, 3, 0, 2 * Math.PI);
                ctx.stroke();
                // ctx.beginPath();
                // ctx.arc(charge.position.x, charge.position.y, 10, 0, 2 * Math.PI);
                // ctx.stroke();
                //
                // ctx.beginPath();
                // let end = new Vector(charge.position.x, charge.position.y);
                // end.add(charge.velocity);
                // // end.add(charge.lastAcceleration);
                // canvas_arrow(ctx, charge.position.x, charge.position.y, end.x, end.y);
                // ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.moveTo(charge.position.x, charge.position.y+5);
                ctx.lineTo(charge.position.x, charge.position.y-5);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(charge.position.x+5, charge.position.y);
                ctx.lineTo(charge.position.x-5, charge.position.y);
                ctx.stroke();
            }
        });
    }
}

// Source: https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag

function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}
