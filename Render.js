class Render{
    constructor(){
        this.layers = [];
    }
    AddLayer(gl){
        return this.layers.push(gl) >= 0;
    }
    Render(){
        //遍历每一个层，并根据状态渲染
        this.layers.forEach(e =>{
            switch (e.currentStatus) {
                case "Nomal":
                    e.NormalDraw();
                    break;
                case "Focus":
                    e.FocusDraw();
                    break;
                case "Active":
                    e.ActiveDraw();
                    break;
                default:
                    //不做操作
                    break;
            }
        });
    }
}
export {Render};