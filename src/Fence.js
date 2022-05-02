import {Vector} from "./Vector";

export class Fence {
    constructor(start, end, accelaration, distance = 10) {
        this.start = start;
        this.end = end;
        this.mid = Vector.clone(this.start);
        this.mid.add(this.end);
        this.mid.x /= 2;
        this.mid.y /= 2;
        this.accelaration = accelaration;
        this.distance = distance;

        this.active = true;
        this.directed = false;
    }

    check(vector) {
        if (this.directed) {
            if (vector.y > this.start.y) {
                return true;
            }
            return false;
        }
        return true;
    }

    getDistance(vector) {
        // return Math.min(vector.getDistance(this.start), vector.getDistance(this.end), vector.getDistance(this.mid));
        return pDistance(vector.x, vector.y, this.start.x, this.start.y, this.end.x, this.end.y);
    }

    // getAngleAndDistance(vector) {
    //     let vectors = [this.start, this.end, this.mid];
    //     let distance;
    //     let index;
    //     vectors.forEach((element, i) => {
    //         let value = vector.getDistance(element);
    //         if (distance === undefined || distance > value) {
    //             distance = value;
    //             index = i;
    //         }
    //     });
    //     // noinspection JSUnusedAssignment
    //     let angle = Math.atan2(vector.y-vectors[index].y, vector.y-vectors[index].y);
    //     // noinspection JSUnusedAssignment
    //     return {distance, angle};
    // }
}


// Source: https://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment

function pDistance(x, y, x1, y1, x2, y2) {
    var A = x - x1;
    var B = y - y1;
    var C = x2 - x1;
    var D = y2 - y1;

    var dot = A * C + B * D;
    var len_sq = C * C + D * D;
    var param = -1;
    if (len_sq !== 0) //in case of 0 length line
        param = dot / len_sq;

    var xx, yy;

    if (param < 0) {
        xx = x1;
        yy = y1;
    }
    else if (param > 1) {
        xx = x2;
        yy = y2;
    }
    else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    var dx = x - xx;
    var dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy);
}