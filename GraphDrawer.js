import Point from "./Point.js";
import DrawStyle from "./DrawStyle.js"
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
    /**
     * 计算结果边界计算以后的坐标
     * @param {Point} p 输入坐标
     * @returns {Point} 返回坐标
     */
    calcFinalPoint(p){
        return new Point( 
                        p.getX() + this.barrier.getX() ,
                        p.getY() + this.barrier.getX() 
                    );
    }
    /**
     * 画一条线
     * @param {Point} from 起点
     * @param {Point} to 终点
     */
    DrawLine(from,to){
        this.ctx.beginPath();
        let _from = this.calcFinalPoint(from);
        this.ctx.moveTo(_from.getX(), _from.getY());
        let _to = this.calcFinalPoint(to);
        this.ctx.lineTo(_to.getX(), _to.getY());
        this.ctx.stroke();
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
export {GraphDrawer};