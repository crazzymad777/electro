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
        this.area = {width: viewport.width, height: viewport.height};

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
                    this.charges.push(new Anchor(50, vector));
                    anchors++;
                }
            }
        }

        for (let i = 0; i < anchors; i++) {
            // let ch = i < 50 ? -1 : 1;
            let ch = -50;
            // let ch = -1;
            let vector = new Vector(this.random(width10, width), this.random(height10, height));
            // while (!this.checkBox(vector)) {
            while(vector.x >= width10*2 && vector.x <= width-width10) {
                vector = new Vector(this.random(width10, width), this.random(height10, height));
            }
            let charge = new Charge(ch, vector);
            this.charges.push(charge);
        }
        // for (let i = 0; i < 8; i++) {
        //     this.charges.push(new Anchor(50, new Vector(width10 + (width10 / 2) + (width10 * i), height10 + height10 / 2)));
        // }
        // for (let i = 0; i < 8; i++) {
        //     this.charges.push(new Anchor(50, new Vector(width10 + (width10 / 2) + (width10 * i), height - height10 / 2)));
        // }
        // for (let i = 0; i < 8; i++) {
        //     this.charges.push(new Anchor(50, new Vector(width10 + width10 / 2, (height10 + height10 / 2) + (height10 * i))));
        // }


        this.viewport.charges = this.charges;


        this.fences = [];
        this.fences = this.fences.concat(this.makeBox([new Vector(width10, height10), new Vector(width, height)], 1));
        this.fences = this.fences.concat(this.makeBox([new Vector(width10*2, height10*2), new Vector(width-width10, height-height10)], -1));

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
        }, 50);
    }

    process() {
        this.viewport.draw();
    }
}
