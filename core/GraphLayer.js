class GraphLayer{
    constructor(p,gd){
        this.LayerName = "";
        this.p = p;
        this.gd = gd;
        this.currentStatus = "Normal";
    }
    UpdateStatus(){
        return null; //or GraphLayerOption
    }
    IsPointAtLayer(p){
        return false;
    }
    NormalDraw(){
        return true;
    }
    ActiveDraw(){
        return true;
    }
    FocusDraw(){
        return true;
    }
}
export {GraphLayer};