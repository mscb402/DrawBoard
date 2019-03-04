class GraphDrawer{
    constructor(ctx,barrier){
        this.barrier = barrier;
        this.ctx = ctx;
        this.defaultStyle = new DrawStyle();
        this.usedStyle = this.defaultStyle;
        this.defaultStyle.InitUsingCanvas(ctx);
        this.InitStyle();
    }

    InitStyle(){
        this.usedStyle = this.defaultStyle;
    }
    SetStyle(newStyle){
        this.usedStyle = newStyle;
    }
    DrawLine(p){

    }
    DrawPoint(p){

    }
    DrawRect(p){

    }
    DrawTriangle(p){

    }
    DrawText(p,text){

    }
    DrawCircle(p,radius){

    }
}
export default GraphDrawer;