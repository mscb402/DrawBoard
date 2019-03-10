import Point from "Point.js";
class GraphDrawer{
    constructor(ctx,barrier){
        //barrier是屏障
        //用于计算其他组件的相对位置
        //默认的barrier应该为（0，0），也就是左上角
        this.barrier = barrier;
        if(barrier == null){
            this.barrier = new Point(0,0);
        }
        
        this.ctx = ctx;
        this.defaultStyle = new DrawStyle();
        this.usedStyle = this.defaultStyle;
        this.defaultStyle.InitUsingCanvas(ctx);
        this.InitStyle();
    }

    InitStyle(){
        this.usedStyle = this.defaultStyle;
    }
    SetStyle(newStyle){
        this.usedStyle = newStyle;
    }
    DrawLine(p){

    }
    DrawPoint(p){

    }
    DrawRect(p){

    }
    DrawTriangle(p){

    }
    DrawText(p,text){

    }
    DrawCircle(p,radius){

    }
}
export default GraphDrawer;