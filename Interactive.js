import {Point} from "./Point";
class Interactive{
    constructor(canv,render){
        this.canv = canv;
        //this.ctx = ctx;
        this.render = render;
        this.currentPoint = new Point();
        this.currentStatus = "Normal";
        this.canv.addEventListener("mousemove", e => { this.mousemove(e); });
        this.canv.addEventListener("mousedown",e => { this.mousedown(e); });
        this.canv.addEventListener("mouseup",e => { this.mouseup(e); });
    }
    mousemove(e){
        let pos = this.getMousePos(e);
        console.log(pos);
        this.render.Render();
    }
    mousedown(e){

    }
    mouseup(e){

    }

    getMousePos(evt) {
        var rect = this.canv.getBoundingClientRect();
        return new Point(
            evt.clientX - rect.left,
            evt.clientY - rect.top );
    }
}
export {Interactive};