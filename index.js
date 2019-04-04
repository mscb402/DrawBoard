
import {Point} from "./core/Point.js";
import {LinePointTo} from "./Layers/LinePointTo"
import { BoxLayer } from "./Layers/box.js";
import { Manager } from "./Manager.js";

let m = new Manager("ctx");

let box = new BoxLayer(new Point(300,10),50,100,10,"Test");
let line = new LinePointTo(new Point(300+50 + 2,10+50),new Point(500 - 2,10+50),"10X20")
let box2 = new BoxLayer(new Point(500,10),50,100,10,"Test2");

m.addLayer(box);
m.addLayer(line);
m.addLayer(box2);

m.on();

