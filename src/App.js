import {Charge} from './Charge';
import {Vector} from './Vector';
import {Engine} from "./Engine";
import {Fence} from "./Fence";
import {Anchor} from "./Anchor";

export class App {
    random(min, max) {
        return Math.random()*(max-min)+min;
    }

    checkBox(vector) {
        let width10 = this.area.width/10;
        let height10 = this.area.height/10;

        let width = this.area.width - width10;
        let height = this.area.height - height10;

        if (vector.x >= width10*2 && vector.x <= width-width10) {
            if (vector.y >= height10*2 && vector.y <= height-height10) {
                return false;
            }
        }

        if (vector.x <= width10 || vector.x >= width || vector.y <= height10 || vector.y >= height) {
            return false;
        }
        return true;
    }

    constructor(viewport) {
        let m = 10;
        this.area = {width: viewport.height, height: viewport.height};

        let width10 = this.area.width/10;
        let height10 = this.area.height/10;

        let width = this.area.width - width10;
        let height = this.area.height - height10;

        this.viewport = viewport;

        this.charges = [];

        let anchors = 0;
        for (let x = 0; x < 30; x++) {
            for (let y = 0; y < 30; y++) {
                let vector = new Vector(width10/3*x + width10/5, height10/3*y + height10/5);
                if (this.checkBox(vector)) {
                    let ch = m;

                    if (y === 23 && x < 10) {
                        let anchor = new Anchor(m*10, Vector.clone(vector));
                        this.charges.push(anchor);
                        anchor.direction = -Math.PI/2;
                    }

                    if (y === 6 && x < 10) {
                        let anchor = new Anchor(-m*10, Vector.clone(vector));
                        this.charges.push(anchor);
                        anchor.direction = Math.PI/2;
                    }

                    if (y !== 6 || x > 7) {
                        if (y >= 7 && y < 23 && x < 10) {
                            ch = -m;

                            // this.charges.push(new Charge(m, Vector.clone(vector)));
                            // this.charges.push(new Charge(-m, Vector.clone(vector)));
                        } else {
                            ch = m;

                            // this.charges.push(new Anchor(m, vector));
                        }
                    }
                    // for (let i = 0; i < Math.random()*10; i++) {
                        let vec = Vector.clone(vector);
                        vec.x += Math.random();
                        vec.y += Math.random();
                        this.charges.push(new Charge(ch * -1, vec));
                    // this.charges.push(new Charge(ch * -1, vec));
                    // }
                    anchors++;
                }
                // else {
                //     if (x === 2 || y === 2 || x === 6 || y === 6 || x === 23 || y === 23 || x === 27 || y === 27) {
                //         this.charges.push(new Anchor(-m, vector));
                //     }
                // }
            }
        }

        // for (let i = 0; i < anchors; i++) {
        //     let vector = new Vector(this.random(width10, width), this.random(height10, height));
        //     while (!this.checkBox(vector)) {
        //         vector = new Vector(this.random(width10, width), this.random(height10, height));
        //     }
        //     let charge = new Charge(m*-1, vector);
        //     this.charges.push(charge);
        // }

        this.viewport.charges = this.charges;


        this.fences = [];
        this.fences = this.fences.concat(this.makeBox([new Vector(width10, height10), new Vector(width, height)], 1));
        this.fences = this.fences.concat(this.makeBox([new Vector(width10*2, height10*2), new Vector(width-width10, height-height10)], -1));
        // this.fences.forEach((fence) => { fence.active = false });

        let fence = new Fence(new Vector(width10, height-height10), new Vector(width10*2, height-height10), new Vector(0, -10), 30);
        fence.directed = true;
        this.fences.push(fence);

        let fence2 = new Fence(new Vector(width10, height-height10-height10/3), new Vector(width10*2, height-height10-height10/3), new Vector(0, -10), 30);
        fence2.directed = true;
        this.fences.push(fence2);

        let fence3 = new Fence(new Vector(width10, height10*2 + height10/3), new Vector(width10*2, height10*2 + height10/3), new Vector(0, -10), 30);
        fence3.directed = true;
        this.fences.push(fence3);

        let fence4 = new Fence(new Vector(width10, height10*2 + height10/3 - height10/3), new Vector(width10*2, height10*2 + height10/3 - height10/3), new Vector(0, -10), 30);
        fence4.directed = true;
        this.fences.push(fence4);
        // this.fences.forEach((fence) => { fence.directed = true });

        this.viewport.fences = this.fences;
        this.engine = new Engine(this.charges, this.fences);
    }

    makeBox(vectors, sign) {
        let k = 1*sign;

        return [
        new Fence(new Vector(vectors[0].x, vectors[0].y), new Vector(vectors[1].x, vectors[0].y), new Vector(0, k)),
        new Fence(new Vector(vectors[0].x, vectors[0].y), new Vector(vectors[0].x, vectors[1].y), new Vector(k, 0)),
        new Fence(new Vector(vectors[1].x, vectors[0].y), new Vector(vectors[1].x, vectors[1].y), new Vector(-k, 0)),
        new Fence(new Vector(vectors[0].x, vectors[1].y), new Vector(vectors[1].x, vectors[1].y), new Vector(0, -k))
        ];
    }

    run() {
        // alert(this.container.clientWidth);
        setInterval(() => {
            this.engine.process();
            this.process()
        }, 5);
    }

    process() {
        this.viewport.draw();
    }
}
