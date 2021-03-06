import {GraphLayer} from "../core/GraphLayer"
import { Point } from "../core/Point";
/**
 * 带文字的连接线
 */
class LinePointTo extends GraphLayer{
    /**
    * 当前仅仅支持横向画线，不支持偏移
    */
    //TODO: 添加斜线支持
    constructor(p,to,text = "",spacing = 5){
        super(p)
        this.LayerName = "LinePointTo";
        this.to = to;
        this.spacing = spacing;
        this.text = text;
        //this.pointTo = pointTo;
        this.calPoint();//计算要绘画的点
        
    }
    UpdateStatus(){
        return null; //or GraphLayerOption
    }
    IsPointAtLayer(p){
        //不允许被激活
        return false;
    }
    NormalDraw(){
        if(this.gd == null){
            return;
        }
        let _from1 = this.RealPoint[0][0];
        let _from2 = this.RealPoint[1][0];
        let _to1   = this.RealPoint[0][1];
        let _to2   = this.RealPoint[1][1];

        let style = this.gd.getDefaultStyle();

        style.strokeStyle = "#D8D8D8";
        style.fillStyle = "#848484";
        style.textAlign = "center";
        this.gd.SetStyle(style);

        this.gd.DrawLine(_from1,_to1);
        this.gd.DrawLine(_from2,_to2);
        let textPoint = new Point(
            (_from1.getX() + _to1.getX()) / 2,
            _to1.getY() - 5
            );
        this.gd.DrawText(textPoint,this.text);
        this.gd.InitStyle();
        //暂时删除箭头
        /*
        let TriangleLeft  = this.RealPoint[2][0];
        let TriangleEnd   = this.RealPoint[2][1];
        let TriangleRight = this.RealPoint[2][2];

        this.gd.DrawLine(TriangleLeft,TriangleEnd);
        this.gd.DrawLine(TriangleRight,TriangleEnd);
        */
        return true;
    }
    ActiveDraw(){
        if(this.gd == null){
            return;
        }
        this.NormalDraw();
        return true;
    }
    FocusDraw(){
        if(this.gd == null){
            return;
        }
        this.NormalDraw();
        return true;
    }
    calPoint(){
        let _from1 = new Point(this.p.getX(), this.p.getY());
        let _from2 = new Point(this.p.getX(), this.p.getY() + this.spacing);

        let _to1 = new Point(this.to.getX(), this.to.getY());
        let _to2 = new Point(this.to.getX(), this.to.getY() + this.spacing);
        
        //这个MagicWeight是一个魔法权重，如果是指向left，就设置为1，对结果没影响。
        //如果是right，那就设置为-1，表示绘画箭头的时候向另一边画
        let MagicWeight = this.pointTo == "left" ? 1 : -1 ;
        let TriangleEnd = new Point(_to2.getX() + (MagicWeight*this.spacing), (_to1.getY() + _to2.getY())/2 );
        let TriangleLeft = new Point(_to1.getX() - (MagicWeight*this.spacing), _to1.getY() - this.spacing);
        let TriangleRight = new Point(_to2.getX() - (MagicWeight*this.spacing), _to2.getY() + this.spacing);

        //统一保存到一个数组里面
        this.RealPoint = [ 
                            [_from1,_to1],
                            [_from2,_to2],
                            [TriangleLeft,TriangleEnd,TriangleRight]
                        ];
    }
}
export {LinePointTo};