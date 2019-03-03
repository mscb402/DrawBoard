class GraphLayer{
    constructor(p,gd){
        this.LayerName = "";
        this.p = p;
        this.gd = gd;
        this.currentStatus = "Nomal";
    }
    UpdateStatus(){
        return null; //or GraphLayerOption
    }
    IsPointAtLayer(p){
        return false;
    }
    NomalDraw(){
        return true;
    }
    ActiveDraw(){
        return true;
    }
    FoucsDraw(){
        return true;
    }
}
export default GraphLayer;