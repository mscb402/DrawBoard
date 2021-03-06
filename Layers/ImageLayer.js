import { GraphLayer } from "../core/GraphLayer";

class ImageLayer extends GraphLayer{
    /**
     * @param {Point} p 
     * @param {array} imgs Image对象的数组 normal,focus,active
     */
    constructor(p,imgs,UpdateStatus=null,IsPointAtLayer=null){
        super(p);
        if( imgs.length < 1 ){
            throw "imgs must be an array";
        }
        this.normalImage = null;
        this.focusImage = null;
        this.activeImage = null;

        this.UpdateStatusFunc = UpdateStatus;//设置函数句柄
        this.IsPointAtLayerFunc = IsPointAtLayer;

        switch (imgs.length) {
            case 1:
                this.normalImage = imgs[0];
                break;
            case 2:
                this.normalImage = imgs[0];
                this.focusImage = imgs[1];
                break;
            case 3:
                this.normalImage = imgs[0];
                this.focusImage = imgs[1];
                this.activeImage = imgs[2];
                break;
        }

    }
    UpdateStatus(){
        if(this.UpdateStatusFunc == null){
            return null;
        }
        return this.UpdateStatusFunc(); 
    }
    IsPointAtLayer(p){
        if(this.IsPointAtLayerFunc == null){
            return false;
        }

        return this.IsPointAtLayerFunc(p);
    }
    NormalDraw(){
        if(this.normalImage == null){
            return true;
        }
        if(!this.normalImage.complete){
            //if image not complete, we needn't draw it;
            return true;
        }
        try {
            this.gd.DrawImage(this.normalImage,this.p);
        } catch (error) {
            //ignore it, when image load failed
        }
        return true;
    }
    ActiveDraw(){
        if(this.activeImage == null){
            return true;
        }
        if(!this.activeImage.complete){
            //if image not complete, we needn't draw it;
            return true;
        }
        try {
            this.gd.DrawImage(this.activeImage,this.p);
        } catch (error) {
            //ignore it, when image load failed
        }
        
        return true;
    }
    FocusDraw(){
        if(this.focusImage == null){
            return true;
        }
        if(!this.focusImage.complete){
            //if image not complete, we needn't draw it;
            return true;
        }
        try {
            this.gd.DrawImage(this.focusImage,this.p);
        } catch (error) {
            //ignore it, when image load failed
        }
        return true;
    }

}
export {ImageLayer}