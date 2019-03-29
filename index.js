import {GraphDrawer} from "./core/GraphDrawer.js"
import {Point} from "./core/Point.js";
//import { DrawStyle } from "./core//DrawStyle.js";
//import {arcRect} from "./Layers/arcRect.js"
//import {LinePointTo} from "./Layers/LinePointTo"
import {arcRectWithText} from "./Layers/arcRectWithText.js";
import { Interactive } from "./core/Interactive.js";
import {Render} from "./core/Render.js"
let can = document.getElementById("ctx");
let ctx = can.getContext('2d');

let gd = new GraphDrawer(ctx,can,new Point(0,0));
let render = new Render();
let test = new arcRectWithText(new Point(10,10),gd,100,100,"hello");
render.AddLayer(test);
let itac = new Interactive(can,render,gd);
itac.start();//启动交互
/*
//gd.barrier = new Point(-40,-10);//
gd.DrawLine(new Point(10,10),new Point(50,50));
gd.DrawPoint(new Point(60,60),5);
//获取当前样式
let s = gd.getCurrentStyle();
s.strokeStyle = "#0000ff"; //修改画笔颜色
gd.SetStyle(s);//刷新画布样式
gd.DrawRect(new Point(70,60),50,60)//画图
//console.log(gd.usedStyle);
gd.InitStyle();//恢复样式
//console.log(gd.usedStyle);
gd.DrawPoint(new Point(30,78),10);

gd.DrawTriangle(new Point(100,30),
                new Point(200,90),
                new Point(70,100))



gd.DrawArc(new Point(150,20),new Point(150,100),new Point(50,20),30)

gd.DrawText(new Point(140,110),"ChenBeng")
let test = new arcRectWithText(new Point(10,10),gd,100,100,"hello");
test.NormalDraw();
//console.log( test.IsPointAtLayer(new Point(100,100)), test.IsPointAtLayer(new Point(200,200)));
//正确
let test2 = new LinePointTo(new Point(110,50),gd,new Point(150,50));
test2.NormalDraw();
//错误
let test3 = new LinePointTo(new Point(110,50),gd,new Point(150,100));
test3.NormalDraw();
*/