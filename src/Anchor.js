import {Charge} from "./Charge";
import {Vector} from "./Vector";

export class Anchor extends Charge {
    constructor(charge, position) {
        super(charge, position)
        this.isAnchor = true;
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
