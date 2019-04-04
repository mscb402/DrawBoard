
import {Point} from "./core/Point.js";
import {LinePointTo} from "./Layers/LinePointTo"
import { BoxLayer } from "./Layers/box.js";
import { Manager } from "./Manager.js";
import { ImageLayer } from "./Layers/ImageLayer.js";

let m = new Manager("ctx");

let box = new BoxLayer(new Point(300,10),50,100,10,"Test");
let line = new LinePointTo(new Point(300+50 + 2,10+50),new Point(500 - 2,10+50),"10X20")
let box2 = new BoxLayer(new Point(500,10),50,100,10,"Test2");
let img = new Image();
img.src = "https://avatars0.githubusercontent.com/u/11229089?s=460&v=4";
let imglay = new ImageLayer(new Point(10,300),[img]);
m.addLayer(box);
m.addLayer(line);
m.addLayer(box2);
m.addLayer(imglay);
m.on();

