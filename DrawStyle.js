class DrawStyle{
    constructor(){
        
        this.fillStyle = "";
        this.strokeStyle  = "";
        this.globalAlpha = "";

        this.lineWidth = "";
        this.lineCap = "";
        this.lineJoin = "";
        this.miterLimit = "";
        this.lineDashOffset = "";

        this.shadowOffsetX = "";
        this.shadowOffsetY = "";
        this.shadowBlur = "";
        this.shadowColor = ""

        this.font = "";
        this.textAlign = "";
        this.textBaseline = "";
        this.direction = "";

        
    }

    InitUsingCanvas(ctx){
        this.fillStyle = ctx.fillStyle;
        this.strokeStyle  = this.strokeStyle;
        this.globalAlpha = this.globalAlpha;

        this.lineWidth = this.lineWidth;
        this.lineCap = this.lineCap;
        this.lineJoin = this.lineJoin;
        this.miterLimit = this.miterLimit;
        this.lineDashOffset = this.lineDashOffset;

        this.shadowOffsetX = this.shadowOffsetX;
        this.shadowOffsetY = this.shadowOffsetY;
        this.shadowBlur = this.shadowBlur;
        this.shadowColor = this.shadowColor;
        
        this.font = this.font;
        this.textAlign = this.textAlign;
        this.textBaseline = this.textBaseline;
        this.direction = this.direction;
        return true;
    }
}