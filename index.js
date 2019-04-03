import {GraphDrawer} from "./core/GraphDrawer.js"
import {Point} from "./core/Point.js";
//import { DrawStyle } from "./core//DrawStyle.js";
//import {arcRect} from "./Layers/arcRect.js"
import {LinePointTo} from "./Layers/LinePointTo"
import {arcRectWithText} from "./Layers/arcRectWithText.js";
import { Interactive } from "./core/Interactive.js";
import {Render} from "./core/Render.js"
import { BoxLayer } from "./Layers/box.js";
let can = document.getElementById("ctx");
let ctx = can.getContext('2d');

let gd = new GraphDrawer(ctx,can,new Point(0,0));
gd.setBackground("grid"); //设置当前为表格背景
gd.onBackground();//并开启背景渲染
let render = new Render();
//let test = new arcRectWithText(new Point(10,10),gd,100,100,"hello");
//let test2 = new arcRectWithText(new Point(150,100),gd,100,100,"hello");
let box = new BoxLayer(new Point(300,10),gd,50,100,10,"Test");
let line = new LinePointTo(new Point(300+50 + 2,10+50),gd,new Point(500 - 2,10+50),"10X20")
let box2 = new BoxLayer(new Point(500,10),gd,50,100,10,"Test2");
render.AddLayer(box);

render.AddLayer(box2);
render.AddLayer(line);
let itac = new Interactive(can,render,gd);
itac.start();//启动交互
