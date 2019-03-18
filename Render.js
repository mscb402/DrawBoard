import C from "CONST.js"

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
                case C.NORMAL_STATUS:
                    e.NormalDraw();
                    break;
                case C.ACTIVE_STATUS:
                    e.FocusDraw();
                    break;
                case C.FOCUS_STATUS:
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