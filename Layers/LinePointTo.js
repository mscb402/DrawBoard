import {GraphLayer} from "../GraphLayer"
import { Point } from "../Point";

class LinePointTo extends GraphLayer{
    constructor(p,gd,to,spacing = 5,pointTo = "left"){
        super(p,gd)
        this.LayerName = "LinePointTo";
        this.to = to;
        this.spacing = spacing;
        this.pointTo = pointTo;
        //this.p = p;
        //this.gd = gd;
        //this.currentStatus = "Normal";
    }
    UpdateStatus(){
        return null; //or GraphLayerOption
    }
    IsPointAtLayer(p){
        return false;
    }
    NormalDraw(){

        let _from1 = new Point(this.p.getX(), this.p.getY());
        let _from2 = new Point(this.p.getX(), this.p.getY() + this.spacing);

        let _to1 = new Point(this.to.getX(), this.to.getY());
        let _to2 = new Point(this.to.getX(), this.to.getY() + this.spacing);

        this.gd.DrawLine(_from1,_to1);
        this.gd.DrawLine(_from2,_to2);

        //这个MagicWeight是一个魔法权重，如果是指向left，就设置为1，对结果没影响。
        //如果是right，那就设置为-1，表示绘画箭头的时候向另一边画
        let MagicWeight = this.pointTo == "left" ? 1 : -1 ;
        let TriangleEnd = new Point(_to2.getX() + (MagicWeight*this.spacing), (_to1.getY() + _to2.getY())/2 );
        let TriangleLeft = new Point(_to1.getX() - (MagicWeight*this.spacing), _to1.getY() - this.spacing);
        let TriangleRight = new Point(_to2.getX() - (MagicWeight*this.spacing), _to2.getY() - this.spacing);

        this.gd.DrawLine(TriangleLeft,TriangleEnd);
        this.gd.DrawLine(TriangleRight,TriangleEnd);
        
        return true;
    }
    ActiveDraw(){
        return true;
    }
    FocusDraw(){
        return true;
    }
}
export {LinePointTo};