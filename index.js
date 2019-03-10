import {GraphDrawer} from "./GraphDrawer.js"
import {Point} from "./Point.js";
import { DrawStyle } from "./DrawStyle.js";
let can = document.getElementById("ctx");
let ctx = can.getContext('2d');

let gd = new GraphDrawer(ctx,new Point(0,0));
gd.barrier = new Point(-40,-10);//
gd.DrawLine(new Point(10,10),new Point(50,50));
gd.DrawPoint(new Point(60,60),5);
//获取当前样式
let s = gd.getCurrentStyle();
s.strokeStyle = "#0000ff"; //修改画笔颜色
gd.SetStyle(s);//刷新画布样式
gd.DrawRect(new Point(70,60),50,60)//画图
console.log(gd.usedStyle);
gd.InitStyle();//恢复样式
console.log(gd.usedStyle);
gd.DrawPoint(new Point(30,78),10);

gd.DrawTriangle(new Point(100,30),
                new Point(200,90),
                new Point(70,100))
