class DrawStyle{

    constructor(){
        this.Style = {};        
        this.Style.fillStyle = "";
        this.Style.strokeStyle  = "";
        this.Style.globalAlpha = "";

        this.Style.lineWidth = "";
        this.Style.lineCap = "";
        this.Style.lineJoin = "";
        this.Style.miterLimit = "";
        this.Style.lineDashOffset = "";

        this.Style.shadowOffsetX = "";
        this.Style.shadowOffsetY = "";
        this.Style.shadowBlur = "";
        this.Style.shadowColor = ""

        this.Style.font = "";
        this.Style.textAlign = "";
        this.Style.textBaseline = "";
        this.Style.direction = "";

        
    }

    InitUsingCanvas(ctx){
        this.Style.fillStyle = ctx.fillStyle;
        this.Style.strokeStyle  = ctx.strokeStyle;
        this.Style.globalAlpha = ctx.globalAlpha;

        this.Style.lineWidth = ctx.lineWidth;
        this.Style.lineCap = ctx.lineCap;
        this.Style.lineJoin = ctx.lineJoin;
        this.Style.miterLimit = ctx.miterLimit;
        this.Style.lineDashOffset = ctx.lineDashOffset;

        this.Style.shadowOffsetX = ctx.shadowOffsetX;
        this.Style.shadowOffsetY = ctx.shadowOffsetY;
        this.Style.shadowBlur = ctx.shadowBlur;
        this.Style.shadowColor = ctx.shadowColor;
        
        this.Style.font = ctx.font;
        this.Style.textAlign = ctx.textAlign;
        this.Style.textBaseline = ctx.textBaseline;
        this.Style.direction = ctx.direction;
        return true;
    }
    ApplyStyle(ctx){
        ctx.fillStyle = this.Style.fillStyle;
        ctx.strokeStyle  = this.Style.strokeStyle;
        ctx.globalAlpha = this.Style.globalAlpha;

        ctx.lineWidth = this.Style.lineWidth;
        ctx.lineCap = this.Style.lineCap;
        ctx.lineJoin = this.Style.lineJoin;
        ctx.miterLimit = this.Style.miterLimit;
        ctx.lineDashOffset = this.Style.lineDashOffset;

        ctx.shadowOffsetX = this.Style.shadowOffsetX;
        ctx.shadowOffsetY = this.Style.shadowOffsetY;
        ctx.shadowBlur = this.Style.shadowBlur;
        ctx.shadowColor = this.Style.shadowColor;
        
        ctx.font = this.Style.font;
        ctx.textAlign = this.Style.textAlign;
        ctx.textBaseline = this.Style.textBaseline;
        ctx.direction = this.Style.direction;
        return true;
    }
}
export {DrawStyle};