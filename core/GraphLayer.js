class GraphLayer{
    constructor(p){
        this.LayerName = "";
        this.p = p;
        this.gd = null;
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
    //设置gd
    setGD(gd){
        this.gd = gd;
    }
}
export {GraphLayer};