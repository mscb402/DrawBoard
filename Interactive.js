import Point from "Point.js";
class Interactive{
    constructor(ctx,render){
        this.ctx = ctx;
        this.render = render;
        this.currentPoint = new Point();
        this.currentStatus = "Normal";
    }
}
export default Interactive;