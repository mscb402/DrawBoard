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
        //默认为不启动
        this.IsStart = false;
        

    }
    //启动交互
    start(){
        this.IsStart = true;
        this.canv.addEventListener("mousemove", e => { this.mousemove(e); });
        this.canv.addEventListener("mousedown",e => { this.mousedown(e); });
        this.canv.addEventListener("mouseup",e => { this.mouseup(e); });
        this.render.Render();
    }
    //结束交互
    end(){
        this.IsStart = false;
        this.canv.addEventListener("mousemove", e => {  });
        this.canv.addEventListener("mousedown",e => {  });
        this.canv.addEventListener("mouseup",e => { });
    }
    //鼠标移动事件，只有启动才会执行
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
                //默认事件
                let ls = this.render.layers;//获取层列表

                //遍历每一个层
                for(let i=0;i<ls.length;i++){
                    let el = ls[i];
                    //减去边界
                    let _pos = new Point(pos.getX() - this.gd.barrier.getX(),pos.getY() - this.gd.barrier.getY());
                    console.log(_pos);
                    if(el.IsPointAtLayer(_pos)){
                        //鼠标在图形范围内。则改变元素状态为 Focus
                        el.currentStatus = C.FOCUS_STATUS;
                    }else{
                        //不在就改为Normal，这样正常渲染
                        el.currentStatus = C.NORMAL_STATUS;
                    }
                }

                break;
        }
        //console.log(pos);
        
        

        //每移动一次鼠标就渲染一次
        this.render.Render();
    }
    //鼠标下压事件，只有启动才会执行
    mousedown(e){
        //设置当前为鼠标下压事件
        this.currentStatus = C.MOUSE_DOWN;
        //记录当前坐标
        let pos = this.getMousePos(e);
        this.PointStack = [];//清空栈
        this.PointStack.push(pos);
    }
    //鼠标上移事件，只有启动才会执行
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

        //这里乘-1，是因为，Barrier的显示和实际相反
        //比如 （1，0）表示向右移动
        //    (-1,0) 表示向左移动
        let move = new Point(
            -1 *(p1.getX() - p2.getX()), 
            -1 *(p1.getY() - p2.getY()))
        return new Point(
            oldPoint.getX() + move.getX(),
            oldPoint.getY() + move.getY(),
        )

    }
}
export {Interactive};