import {GraphDrawer} from "./GraphDrawer.js"
import {Point} from "./Point.js";
import { DrawStyle } from "./DrawStyle.js";
let can = document.getElementById("ctx");
let ctx = can.getContext('2d');

let gd = new GraphDrawer(ctx,new Point(0,0));
gd.DrawLine(new Point(10,10),new Point(50,50));
gd.DrawPoint(new Point(60,60),5);
//获取当前样式
let Style = gd.getCurrentStyle();
Style.strokeStyle = "#0000ff"; //修改画笔颜色
gd.SetStyle(Style);//刷新画布样式
gd.DrawRect(new Point(70,60),50,60)//画图

gd.InitStyle();//恢复样式

gd.DrawPoint(new Point(30,78),10);
