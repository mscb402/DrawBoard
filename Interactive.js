import {Point} from "./Point";
import {C} from "./CONST"
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
    //鼠标移动时间
    mousemove(e){
        let pos = this.getMousePos(e);
        //console.log(pos);
        let ls = this.getWasPointedLayers(pos);
        /*
        暂时先不处理
        ls.forEach(el => {
            el.currentStatus = C.FOCUS_STATUS;
            el.UpdateStatus();
        });
        */
        this.render.Render();
    }
    //鼠标下压事件
    mousedown(e){

    }
    //鼠标上移事件
    mouseup(e){

    }
    getWasPointedLayers(p){
        let ls = [];
        for(let i=0;i<this.render.layers.length;i++){
            let l = this.render.layers[i];
            if(l.IsPointAtLayer(p)){
                ls.push(l);
            }
        }
        return ls;
    }
    //这个函数最后写
    statusTrans(layerSts,currentMouseSts){
        switch (layerSts) {
            case C.NORMAL_STATUS:
                if(currentMouseSts == C.MOUSE_OVER){
                    return C.FOCUS_STATUS;
                }
                break;
            case C.FOCUS_STATUS:
                if(currentMouseSts == C.MOUSE_DOWN){
                    return C.ACTIVE_STATUS;
                }
                if(currentMouseSts == C.MOUSE_OVER){
                    return C.FOCUS_STATUS;
                }
            case C.ACTIVE_STATUS:
                break;
            default:
                return C.NORMAL_STATUS;
        }
        
    }
    /**
     * 获取鼠标在画布上的位置
     * @param {*} evt 
     */
    getMousePos(evt) {
        var rect = this.canv.getBoundingClientRect();
        return new Point(
            evt.clientX - rect.left,
            evt.clientY - rect.top );
    }
}
export {Interactive};