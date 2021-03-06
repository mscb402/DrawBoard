import {Point} from "./Point.js";
import {DrawStyle} from "./DrawStyle.js"
class GraphDrawer{
    constructor(ctx,canv,barrier = new Point(0,0)){
        //barrier是屏障
        //用于计算其他组件的相对位置
        //默认的barrier应该为（0，0），也就是左上角
        this.barrier = barrier;
        if(barrier == null){
            this.barrier = new Point(0,0);
        }

        this.ctx = ctx;
        this.canv = canv;
        this.defaultStyle = new DrawStyle();
        this.defaultStyle.InitUsingCanvas(ctx);

        this.usedStyle = new DrawStyle();
        this.usedStyle.Style = JSON.parse(JSON.stringify(this.defaultStyle.Style))
        
        this.backgroundEnable = false; // 设置背景状态
        this.background = ""; // 当前背景
        this.BackgroundFunc = ()=>{}; // 一个匿名函数，用于绘制背景

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
     * 设置背景
     * @param {string} background 
     */
    setBackground(background){
        if(background == "grid"){
            this.onBackground();
            this.BackgroundFunc = this.drawGradBackground;
        }
    }
    /**
     * 绘制背景
     */
    drawBackground(){
        if(this.backgroundEnable){
            this.BackgroundFunc()
        }
    }
    /**
     * 开启背景
     */
    onBackground(){
        this.backgroundEnable = true;
    }
    /**
     * 关闭背景
     */
    offBackground(){
        this.backgroundEnable = false;
    }
    /**
     * 添加表格背景绘画函数
     * @param {int} space 间距，暂时未实现
     */
    drawGradBackground(space = 30){
        let w = this.canv.width;
        let h = this.canv.height;

        let style = this.getDefaultStyle();
        style.strokeStyle = "#FAFAFA";
        this.SetStyle(style);
        this.ctx.beginPath();
        for(let y = 0;y <= h;y += space){
            let _from = new Point(0,y);
            let _to = new Point(w,y);
            this.ctx.moveTo(_from.getX(), _from.getY());
            this.ctx.lineTo(_to.getX(), _to.getY());
        }

        for(let x = 0;x <= w;x += space){
            let _from = new Point(x,0);
            let _to = new Point(x,h);
            this.ctx.moveTo(_from.getX(), _from.getY());
            this.ctx.lineTo(_to.getX(), _to.getY());
        }
        this.ctx.stroke();
        return true;
    }


    /**
     * 计算结果边界计算以后的坐标
     * @param {Point} p 输入坐标
     * @returns {Point} 返回坐标
     */
    calcFinalPoint(p){
        return new Point( 
                        p.getX() + this.barrier.getX() ,
                        p.getY() + this.barrier.getY() 
                    );
    }
    /**
     * 画一条线
     * @param {Point} from 起点
     * @param {Point} to 终点
     */
    _DrawLine(from,to){
        let _from = this.calcFinalPoint(from);
        this.ctx.moveTo(_from.getX(), _from.getY());
        let _to = this.calcFinalPoint(to);
        this.ctx.lineTo(_to.getX(), _to.getY());
        return true;
    }
    DrawLine(from,to){
        this.ctx.beginPath();
        this._DrawLine(from,to);
        this.ctx.stroke();
        return true;
    }
    /**
     * 画一个点，其实就是一个实心的圆
     * @param {Point} p 顶点
     * @param {int} radius 半径
     */
    _DrawPoint(p,radius = 1){
        return this._DrawCircle(p,radius,true);
    }
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
    _DrawRect(from,width,height){
        let _from = this.calcFinalPoint(from);

        this.ctx.rect(_from.getX(),_from.getY(),width,height);

        return true;
    }
    DrawRect(from,width,height,fill = false){
        this.ctx.beginPath();
        this._DrawRect(from,width,height)
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
    _DrawTriangle(p1,p2,p3){
        let _p1 = this.calcFinalPoint(p1);
        let _p2 = this.calcFinalPoint(p2);
        let _p3 = this.calcFinalPoint(p3);

        this.ctx.moveTo(_p1.getX(),_p1.getY());
        this.ctx.lineTo(_p2.getX(),_p2.getY());
        this.ctx.lineTo(_p3.getX(),_p3.getY());
        this.ctx.lineTo(_p1.getX(),_p1.getY());

        return true;
    }
    DrawTriangle(p1,p2,p3,fill = false){
        this.ctx.beginPath();
        this._DrawTriangle(p1,p2,p3)
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
     * 
     * @param {Point} p 坐标
     * @param {String} text 文本 
     * @param {boolean} fill  文本描边还是正常，默认为true，为正常
     */
    DrawText(p,text,fill = true){
        let _p = this.calcFinalPoint(p);
        if(!fill){
            //文本描边
            this.ctx.strokeText(text,_p.getX(),_p.getY());
        }else{
            //正常的文本
            this.ctx.fillText(text,_p.getX(),_p.getY());
        }
        return true;
        
    }
    /**
     * 画一个圆
     * @param {Point} p 点位置
     * @param {int} radius 半径
     * @param {boolean} fill 是否为填充模式（默认为假，即画线）
     * @param {Array} arc 角度，默认为[0,2*Math.PI],分别表示起始角/结束角，以弧度计。
     */
    _DrawCircle(p,radius,arc=[0,2*Math.PI]){
        let _p = this.calcFinalPoint(p);
        this.ctx.arc(_p.getX(),_p.getY(),radius,arc[0],arc[1]);
        return true;
    }
    DrawCircle(p,radius,fill = false,arc=[0,2*Math.PI]){
        this.ctx.beginPath();
        this._DrawCircle(p,radius,arc);
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
     * 相当于在3个点之间创建一条弧，只有3个点才能获得得到2个切线
     * @param {Point} start 起始点
     * @param {Point} p1 端点1
     * @param {Point} p2 端点2
     * @param {int} radius 半径
     */
    _DrawArc(start,p1,p2,radius){
        

        let _p1 = this.calcFinalPoint(p1);
        let _p2 = this.calcFinalPoint(p2);
        let _start = this.calcFinalPoint(start);

        this.ctx.moveTo(_start.getX(), _start.getY());
        this.ctx.arcTo(_p1.getX(),_p1.getY(),_p2.getX(),_p2.getY(),radius);
        
        return true;

    }
    DrawArc(start,p1,p2,radius){
        this.ctx.beginPath();
        this._DrawArc(start,p1,p2,radius)
        this.ctx.stroke();
        return true;
    }
    /**
     * 画一个带圆角的矩形
     * @param {Point} from 
     * @param {int} width 
     * @param {int} height 
     * @param {int} radius 
     */
    DrawArcBox(from,width, height, radius,fill){
        this.ctx.beginPath();
        this._DrawArcBox(from,width, height, radius)
        this.ctx.closePath();
        if(fill){
            this.ctx.fill();
        }else{
            this.ctx.stroke();
        }
        
        return true;
    }
    _DrawArcBox(from,width, height, r){
        let _p1 = this.calcFinalPoint(from);
        //this.ctx.moveTo(_p1.getX(),_p1.getY());
        let pi = Math.PI;
        this.ctx.arc(_p1.getX() + r, _p1.getY() + r, r, - pi, -pi / 2);
        this.ctx.arc(_p1.getX() + width - r, _p1.getY() + r, r, -pi / 2, 0);
        this.ctx.arc(_p1.getX() + width - r, _p1.getY() + height - r, r, 0, pi / 2);
        this.ctx.arc(_p1.getX() + r, _p1.getY() + height - r, r, pi / 2, pi);

    }
    /**
     * 
     * @param {image} img 图形
     * @param {Point} p 坐标
     */
    DrawImage(img,p){
        let _p = this.calcFinalPoint(p);
        this.ctx.drawImage(img,_p.getX(),_p.getY());
    }
    /**
     * 清空画布
     */
    Clear(){
        this.ctx.clearRect(0, 0, this.canv.width, this.canv.height);
    }
}
export {GraphDrawer};