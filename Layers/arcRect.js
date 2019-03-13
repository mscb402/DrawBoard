import {GraphLayer} from "../GraphLayer"
import { Point } from "../Point";

class arcRect extends GraphLayer{
    constructor(p,gd,w,h,r){
        super(p,gd);
        /*
        this.LayerName = "";
        this.p = p;
        this.gd = gd;
        this.currentStatus = "Normal";
        */
        this.w = w; //宽
        this.h = h; //高
        this.r = r; // 半径
        
    }
    UpdateStatus(){
        return null; //or GraphLayerOption
    }
    IsPointAtLayer(p){
        let _p = new Point(p.getX() - this.p.getX() ,p.getY() - this.p.getY())
        if(_p.getX() <= this.w && _p.getY() <= this.h){
            return true;
        } 
        return false;
    }

    NormalDraw(){
        
        let LeftTop1 = this.p;
        let LeftTop2 = new Point(LeftTop1.getX() + this.r, LeftTop1.getY() );
        let LeftTop3 = new Point(LeftTop1.getX(), LeftTop1.getY() + this.r );
        
        this.gd.DrawArc(
            LeftTop2,
            LeftTop1,
            LeftTop3,
            this.r
        );
        
        let RightTop1 = new Point(LeftTop1.getX() + this.w, LeftTop1.getY() );
        let RightTop2 = new Point(LeftTop1.getX() + this.w - this.r, LeftTop1.getY() );
        let RightTop3 = new Point(LeftTop1.getX() + this.w, LeftTop1.getY() + this.r );
        
        this.gd.DrawArc(
            RightTop2,
            RightTop1,
            RightTop3,
            this.r
        );
      
        let LeftDown1 = new Point(LeftTop1.getX() , LeftTop1.getY() + this.h );
        let LeftDown2 = new Point(LeftTop1.getX() , LeftTop1.getY() - this.r + this.h );
        let LeftDown3 = new Point(LeftTop1.getX() + this.r, LeftTop1.getY() + this.h );
        
        this.gd.DrawArc(
            LeftDown2,
            LeftDown1,
            LeftDown3,
            this.r
        );

        let RightDown1 = new Point(LeftTop1.getX() + this.w , LeftTop1.getY() + this.h );
        let RightDown2 = new Point(LeftTop1.getX() + this.w - this.r, LeftTop1.getY()  + this.h );
        let RightDown3 = new Point(LeftTop1.getX() + this.w, LeftTop1.getY() + this.h - this.r );
        
        this.gd.DrawArc(
            RightDown2,
            RightDown1,
            RightDown3,
            this.r
        );
        
        this.gd.DrawLine(LeftTop2,RightTop2);
        this.gd.DrawLine(RightTop3,RightDown3);
        this.gd.DrawLine(RightDown2,LeftDown3);
        this.gd.DrawLine(LeftDown2,LeftTop3);
        return true;
    }

    ActiveDraw(){
        return true;
    }
    FocusDraw(){
        return true;
    }
}
export {arcRect};