import {Point} from "./Point.js";
import {DrawStyle} from "./DrawStyle.js"
class GraphDrawer{
    constructor(ctx,barrier = new Point(0,0)){
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
    /**
     * 初始化样式
     */
    InitStyle(){
        this.usedStyle = this.defaultStyle;
    }
    /**
     * 设置新的样式
     * @param {DrawStyle} newStyle 新点样式
     */
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
        return true;
    }
    /**
     * 画一个点，其实就是一个实心的圆
     * @param {Point} p 顶点
     * @param {int} radius 半径
     */
    DrawPoint(p,radius = 1){
        return this.DrawCircle(p,radius,true);
    }
    /**
     * 画一个正方形
     * @param {Point} from 坐标
     * @param {int} width 宽
     * @param {int} height 高
     * @param {boolean} fill 是否填充，默认假
     */
    DrawRect(from,width,height,fill = false){
        this.ctx.beginPath();
        let _from = this.calcFinalPoint(from);

        this.ctx.rect(_from.getX(),_from.getY(),width,height);

        if(!fill){
            //画线
            this.ctx.stroke();
        }else{
            //填充
            this.ctx.fill();
        }

        return true;
    }
    DrawTriangle(p){

    }
    DrawText(p,text){

    }
    /**
     * 画一个圆
     * @param {Point} p 点位置
     * @param {int} radius 半径
     * @param {boolean} fill 是否为填充模式（默认为假，即画线）
     * @param {Array} arc 角度，默认为[0,2*Math.PI],分别表示起始角/结束角，以弧度计。
     */
    DrawCircle(p,radius,fill = false,arc=[0,2*Math.PI]){
        this.ctx.beginPath();
        let _p = this.calcFinalPoint(p);
        this.ctx.arc(_p.getX(),_p.getY(),radius,arc[0],arc[1]);
        if(!fill){
            //画线
            this.ctx.stroke();
        }else{
            //填充
            this.ctx.fill();
        }
        
        return true;
    }
}
export {GraphDrawer};