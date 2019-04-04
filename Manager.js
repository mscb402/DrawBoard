//layer 管理器
import {Render} from "./core/Render.js"
import {GraphDrawer} from "./core/GraphDrawer.js"
import {Point} from "./core/Point.js";
import {Interactive} from "./core/Interactive.js";

class Manager{
    constructor(canvas){

        this.canv = document.getElementById(canvas);
        this.ctx = this.canv.getContext('2d');
        this.gd = new GraphDrawer(this.ctx, this.canv, new Point(0,0));//声明画板
        this.gd.setBackground("grid"); //设置当前为表格背景
        this.gd.onBackground();//并开启背景渲染
        this.render = new Render();//声明渲染对象
        this.interactive = new Interactive(this.canv, this.render, this.gd);//声明交互器
    }
    addLayer(layer){
        this.render.AddLayer(layer);
    }
    on(){
        this.interactive.start();
    }
}
export {Manager}