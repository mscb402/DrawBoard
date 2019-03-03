class GraphDrawer{
    constructor(ctx,barrier){
        this.barrier = barrier;
        this.ctx = ctx;
        this.defaultStyle = new DrawStyle();
        this.usedStyle = this.defaultStyle;
        this.InitStyle();
    }

    InitStyle(){
        this.defaultStyle.InitUsingCanvas(ctx);
    }
    SetStyle(newStyle){
        this.usedStyle = this.defaultStyle;
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