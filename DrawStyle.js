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
        this.strokeStyle  = ctx.strokeStyle;
        this.globalAlpha = ctx.globalAlpha;

        this.lineWidth = ctx.lineWidth;
        this.lineCap = ctx.lineCap;
        this.lineJoin = ctx.lineJoin;
        this.miterLimit = ctx.miterLimit;
        this.lineDashOffset = ctx.lineDashOffset;

        this.shadowOffsetX = ctx.shadowOffsetX;
        this.shadowOffsetY = ctx.shadowOffsetY;
        this.shadowBlur = ctx.shadowBlur;
        this.shadowColor = ctx.shadowColor;
        
        this.font = ctx.font;
        this.textAlign = ctx.textAlign;
        this.textBaseline = ctx.textBaseline;
        this.direction = ctx.direction;
        return true;
    }
    ApplyStyle(ctx){
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle  = this.strokeStyle;
        ctx.globalAlpha = this.globalAlpha;

        ctx.lineWidth = this.lineWidth;
        ctx.lineCap = this.lineCap;
        ctx.lineJoin = this.lineJoin;
        ctx.miterLimit = this.miterLimit;
        ctx.lineDashOffset = this.lineDashOffset;

        ctx.shadowOffsetX = this.shadowOffsetX;
        ctx.shadowOffsetY = this.shadowOffsetY;
        ctx.shadowBlur = this.shadowBlur;
        ctx.shadowColor = this.shadowColor;
        
        ctx.font = this.font;
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;
        ctx.direction = this.direction;
        return true;
    }
}
export {DrawStyle};