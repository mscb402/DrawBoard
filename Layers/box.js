import {GraphLayer} from "../core/GraphLayer"
import { Point } from "../core/Point";
/**
 * 带文字和圆角的正方形
 */
class BoxLayer extends GraphLayer{
    constructor(p,w,h,r,text,UpdateStatus=null){
        super(p)
        this.LayerName = "BoxLayer";
        this.w = w; //宽
        this.h = h; //高
        this.r = r; // 半径
        this.text = text;//文字
        this.UpdateStatusFunc = UpdateStatus;
    }
    UpdateStatus(){
        if(this.UpdateStatusFunc == null){
            return null;
        }
        return this.UpdateStatusFunc(); //or GraphLayerOption
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
        if(this.gd == null){
            return;
        }
        let style = this.gd.getDefaultStyle();
        style.fillStyle = "#CEE3F6";
        style.strokeStyle = "#81BEF7";
        this.gd.SetStyle(style);
        this.gd.DrawArcBox(this.p,this.w,this.h,this.r,true);
        this.gd.DrawArcBox(this.p,this.w,this.h,this.r,false);
        this.gd.InitStyle();
        this.drawText(this.text, "#0B243B")
        return true;
    }
    ActiveDraw(){
        if(this.gd == null){
            return;
        }
        let style = this.gd.getDefaultStyle();
        style.fillStyle = "#81BEF7";
        style.strokeStyle = "#81BEF7";
        this.gd.SetStyle(style);
        this.gd.DrawArcBox(this.p,this.w,this.h,this.r,true);
        this.gd.DrawArcBox(this.p,this.w,this.h,this.r,false);
        this.gd.InitStyle();
        this.drawText(this.text, "#fff")
        return true;
    }
    FocusDraw(){
        if(this.gd == null){
            return;
        }
        let style = this.gd.getDefaultStyle();
        style.fillStyle = "#CEE3F6";
        style.strokeStyle = "#CEF6D8";
        this.gd.SetStyle(style);
        this.gd.DrawArcBox(this.p,this.w,this.h,this.r,true);
        this.gd.DrawArcBox(this.p,this.w,this.h,this.r,false);
        this.gd.InitStyle();
        this.drawText(this.text, "#0B243B")
        return true;
    }
    drawText(s,color){
        let x = this.p.getX() + this.w/2;
        let y = this.p.getY() + this.h/2;
        let objStyle = this.gd.getCurrentStyle();
        objStyle.textAlign = "center";
        objStyle.fillStyle = color;
        this.gd.SetStyle(objStyle);
        this.gd.DrawText(new Point(x,y),s);
        this.gd.InitStyle();
        return;
    }
}
export {BoxLayer};