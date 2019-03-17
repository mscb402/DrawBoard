import { arcRect } from "./arcRect";
import {GraphLayer} from "../GraphLayer"
import { Point } from "../Point";

class arcRectWithText extends GraphLayer{
    constructor(p,gd,w,h,text){
        super(p,gd)
        this.LayerName = "arcRectWithText";
        this.w = w;
        this.h = h;
        this.arcRect = new arcRect(p,gd,w,h,10);
    }
    UpdateStatus(){
        return null; //or GraphLayerOption
    }
    IsPointAtLayer(p){
        return false;
    }
    NormalDraw(){
        this.arcRect.NormalDraw();
        let x = this.p.getX() + this.w/2;
        let y = this.p.getY() + this.h/2;
        this.gd.DrawText(new Point(x,y),this.text);
        return true;
    }
    ActiveDraw(){
        this.NormalDraw();
        this.arcRect.ActiveDraw();
        return true;
    }
    FocusDraw(){
        this.NormalDraw();
        this.arcRect.FocusDraw();
        return true;
    }
}
export {arcRectWithText}