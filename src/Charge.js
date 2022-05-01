import {Vector} from './Vector';

export class Charge {
    constructor(charge, position) {
        this.lastAcceleration = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.position = position;

        this.dryAcceleration = new Vector(0, 0);
        this.dryVelocity = new Vector(0, 0);
        this.dryPosition = Vector.clone(position);

        this.charge = charge;
    }

    getDistance(other) {
        return this.position.getDistance(other.position);
    }

    process() {
        this.lastAcceleration = this.calc({
            velocity: this.velocity,
            acceleration: this.acceleration,
            position: this.position
        });
        this.wet();
    }

    wet() {
        this.dryAcceleration.copy(this.acceleration);
        this.dryVelocity.copy(this.velocity);
        this.dryPosition.copy(this.position);
    }

    dryProcess() {
        this.calc({velocity: this.dryVelocity, acceleration: this.dryAcceleration, position: this.dryPosition});
    }

    calc(triple) {
        triple.velocity.add(triple.acceleration);
        let a = triple.velocity.abs();
        if (a > 1) {
            triple.velocity.x = triple.velocity.x / a;
            triple.velocity.y = triple.velocity.y / a;
        }
        triple.position.add(triple.velocity);
        let lastAcceleration = Vector.clone(triple.acceleration);
        triple.acceleration.reset();
        return lastAcceleration;
    }
}
