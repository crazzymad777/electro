import {Charge} from "./Charge";
import {Vector} from "./Vector";

export class Anchor extends Charge {
    constructor(charge, position) {
        super(charge, position);
        this.isAnchor = true;
        this.memCharge = charge;
        this.empty = true;
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.direction = null;
    }

    process() {
    }

    wet() {
    }

    dryProcess() {
    }

    calc(triple) {
    }
}
