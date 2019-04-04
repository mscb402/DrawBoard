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
    /**
     * 添加新层
     * @param {GraphLayer} layer 继承于GraphLayer的层
     */
    addLayer(layer){
        layer.setGD(this.gd);
        this.render.AddLayer(layer);
    }
    /**
     * 获取render所有需要绘制的层
     */
    getLayers(){
        return this.render.layers;
    }
    /**
     * 获得某个下标的层
     * @param {int} index 下标
     */
    getLayer(index){
        return this.render.layers[index];
    }
    /**
     * 批量设置层
     * 一般用于整个层结构更改
     * @param {array} layers 
     */
    setLayers(layers){
        this.render.layers = [];
        for(let i = 0;i<layers.length;i++){
            this.addLayer(layers[i]);//依次添加到render的layer中，并设置gd
        }
        return;

    }
    //开启
    on(){
        this.interactive.start();
    }
    //关闭
    off(){
        this.interactive.end();
    }
}
export {Manager}