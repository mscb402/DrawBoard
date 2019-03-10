import {GraphDrawer} from "./GraphDrawer.js"
import Point from "./Point.js";
let can = document.getElementById("ctx");
let ctx = can.getContext('2d');

let gd = new GraphDrawer(ctx,new Point(0,0));
gd.DrawLine(new Point(10,10),new Point(50,50));
//console.log(p);