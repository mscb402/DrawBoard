class Render{
    constructor(){
        this.layers = [];
    }
    AddLayer(gl){
        return this.layers.push(gl) >= 0;
    }
    Render(){

    }
}
export {Render};