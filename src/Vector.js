export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static clone(other) {
        return new Vector(other.x, other.y)
    }

    getDistance(other) {
        return Math.sqrt(Math.pow(this.x-other.x, 2) + Math.pow(this.y-other.y, 2))
    }

    abs() {
        // noinspection JSSuspiciousNameCombination
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
    }

    angle(other) {
        return Math.atan2(this.y-other.y, this.x-other.x);
    }

    addNumber(number) {
        this.x += number;
        this.y += number;
    }

    reset() {
        this.x = 0;
        this.y = 0;
    }

    copy(other) {
        this.x = other.x;
        this.y = other.y;
    }
}
