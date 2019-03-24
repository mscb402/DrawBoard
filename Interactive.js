import {Point} from "./Point";
import {C} from "./CONST"
class Interactive{
    constructor(canv,render,gd){
        this.gd = gd;
        this.canv = canv;
        //this.ctx = ctx;
        this.render = render;
        this.currentPoint = new Point();
        this.currentStatus = "Normal";
        this.PointStack = [];//坐标栈
        this.canv.addEventListener("mousemove", e => { this.mousemove(e); });
        this.canv.addEventListener("mousedown",e => { this.mousedown(e); });
        this.canv.addEventListener("mouseup",e => { this.mouseup(e); });
    }
    //鼠标移动时间
    mousemove(e){
        let pos = this.getMousePos(e);
        switch (this.currentStatus) {
            case C.MOUSE_DOWN:
                //说明是鼠标按下进行拖动
                //暂时不考虑拖动控件，直接拖动全局画布
                //所以我们这里直接移动barry
                //还需要计算一下移动的幅度
                this.PointStack.push(pos);
                let newBarrier = this.caclMovePoint(this.gd.barrier);
                this.gd.barrier = newBarrier;
                this.PointStack = [];
                this.PointStack.push(pos);
                break;
        
            default:
                break;
        }
        //console.log(pos);
        //let ls = this.getWasPointedLayers(pos);
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
        //设置当前为鼠标下压事件
        this.currentStatus = C.MOUSE_DOWN;
        //记录当前坐标
        let pos = this.getMousePos(e);
        this.PointStack = [];//清空栈
        this.PointStack.push(pos);
    }
    //鼠标上移事件
    mouseup(e){
        //设置当前为鼠标上移事件
        this.currentStatus = C.MOUSE_UP;
        this.PointStack = [];//清空栈
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
    /**
     * 计算拖动移动的幅度
     * @param {Point} oldPoint 
     */
    caclMovePoint(oldPoint = new Point(0,0)){
        if(this.PointStack.length < 2){
            //栈没有2个直接跳过
            return oldPoint;
        }

        let p1 = this.PointStack[0];
        let p2 = this.PointStack[1];

        let move = new Point(p1.getX() - p2.getX(), p1.getY() - p2.getY())
        return new Point(
            oldPoint.getX() + move.getX(),
            oldPoint.getY() + move.getY(),
        )

    }
}
export {Interactive};