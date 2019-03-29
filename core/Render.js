import {C} from "./CONST"

class Render{
    constructor(){
        this.layers = [];
    }
    AddLayer(gl){
        return this.layers.push(gl) >= 0;
    }
    Render(){
        //遍历每一个层，并根据状态渲染

        //渲染先需要情况画布
        //这里清空画布的接口在layer的gd属性里面，所以随便找到一个调用它的gd
        if(this.layers.length >= 1){
            this.layers[0].gd.Clear();
        }else{
            //没有层需要渲染
            return;
        }

        this.layers.forEach(e =>{
            //console.log(e.currentStatus,C.NORMAL_STATUS);
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