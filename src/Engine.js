import {Vector} from "./Vector";

export class Engine {
    constructor(charges, fences, noanchor = true) {
        this.charges = charges;
        this.fences = fences;
        this.noanchor = noanchor;
    }

    process() {
        this.charges.forEach(
            (charge, i) => {
                let force = new Vector(0, 0);
                this.charges.forEach(
                    (other, j) => {
                        if (i !== j) {
                            let r = charge.getDistance(other);
                            let f = Math.abs(other.charge)/Math.pow(r, 2);
                            let sign = -Math.sign(other.charge*charge.charge);
                            let angle = Math.atan2(other.position.y-charge.position.y, other.position.x-charge.position.x);

                            if (sign < 0 || r >= 20 || !this.noanchor) {
                                force.x += f * sign * Math.cos(angle);
                                force.y += f * sign * Math.sin(angle);
                            }
                        }
                    }
                );
                this.fences.forEach((fence) => {
                    if (fence.active) {
                        let distance = fence.getDistance(charge.position);
                        if (distance < 10) {
                            if (fence.check(charge.position)) {
                                force.reset();
                                charge.velocity.copy(fence.accelaration);
                            }
                        }
                    }
                });
                charge.acceleration = force;
            }
        );

        this.charges.forEach((charge) => {
            // let newVector = Vector.clone(charge.position);
            // newVector.add(charge.velocity);
            // newVector.add(charge.acceleration);
            // this.fences.forEach((fence) => {
            //    fence.check(charge, newVector);
            // });
            charge.process();
        });
    }
}
