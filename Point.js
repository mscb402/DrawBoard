class Point{
    //坐标类
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    getX() {
        return this.x;
    };
    getY() {
        return this.y;
    };

    setX(x){
        return this.x = x;
    }
    setY(y){
        return this.y = y;
    }
}
export default Point;