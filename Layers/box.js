import {GraphLayer} from "../core/GraphLayer"
import { Point } from "../core/Point";
class arcRect extends GraphLayer{
    constructor(p,gd,w,h,r){
        super(p,gd)
        this.LayerName = "BoxLayer";
        this.w = w; //宽
        this.h = h; //高
        this.r = r; // 半径
    }
    UpdateStatus(){
        return null; //or GraphLayerOption
    }
    IsPointAtLayer(p){
        if(p.getX() >= this.p.getX() && p.getX() <= this.p.getX()+this.w){
            if( p.getY() >= this.p.getY() && p.getY() <= this.p.getY()+this.h ){
                return true;
            }
        }
        return false;
    }
    NormalDraw(){
        let style = this.gd.getDefaultStyle();
        style.fillStyle = "#010101";
        style.strokeStyle = "blue";
        this.gd.SetStyle(style);
        this.gd.DrawArcBox(p,this.w,this.h,this.r,true);
        this.gd.DrawArcBox(p,this.w,this.h,this.r,false);
        this.gd.InitStyle();
        return true;
    }
    ActiveDraw(){
        return true;
    }
    FocusDraw(){
        return true;
    }
}
export {BoxLayer};