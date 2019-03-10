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
        this.defaultStyle.InitUsingCanvas(ctx);

        this.usedStyle = new DrawStyle();
        this.usedStyle.Style = JSON.parse(JSON.stringify(this.defaultStyle.Style))
        
        this.InitStyle();
    }
    /**
     * 初始化样式
     */
    InitStyle(){
        //this.usedStyle = new DrawStyle();
        this.usedStyle.Style = JSON.parse(JSON.stringify(this.defaultStyle.Style))

        this.usedStyle.ApplyStyle(this.ctx);
    }
    /**
     * 设置新的样式，只有调用该函数才会刷新ctx的样式。
     * @param {DrawStyle} newStyle 新点样式
     */
    SetStyle(newStyle){
        this.usedStyle.Style = newStyle;
        this.usedStyle.ApplyStyle(this.ctx);
    }
    /**
     * 获得当前正在使用的颜色，方便基于当前样式进行修改。
     * @returns {Object} 一个style Map
     */
    getCurrentStyle(){
        return this.usedStyle.Style;
    }
    /**
     * 获取初始化的样式，是全局样式，用于回滚操作的
     * @returns {Object} 一个style Map
     */
    getDefaultStyle(){
        //返回深拷贝的Style对象，因为该默认样式是要用于InitStyle方法的
        //如果用户用浅拷贝，可能会被用户修改，导致样式无法回滚
        return JSON.parse(JSON.stringify(this.defaultStyle.Style))
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
    /**
     * 画一个三角形
     * @param {Point} p1 点1
     * @param {Point} p2 点2
     * @param {Point} p3 点3
     * @param {boolean} fill 是否填充，默认为假 
     */
    DrawTriangle(p1,p2,p3,fill = false){
        this.ctx.beginPath();
        let _p1 = this.calcFinalPoint(p1);
        let _p2 = this.calcFinalPoint(p2);
        let _p3 = this.calcFinalPoint(p3);

        this.ctx.moveTo(_p1.getX(),_p1.getY());
        this.ctx.lineTo(_p2.getX(),_p2.getY());
        this.ctx.lineTo(_p3.getX(),_p3.getY());
        this.ctx.lineTo(_p1.getX(),_p1.getY());

        if(!fill){
            //画线
            this.ctx.stroke();
        }else{
            //填充
            this.ctx.fill();
        }
        return true;
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