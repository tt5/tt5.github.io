

function runcanvas() {

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.lineWidth = 4
ctx.strokeStyle = "yellow";
  drawlinedown(ctx, 1, 0, 8);
  drawlinedown(ctx, 3, 2, 6);
  drawlinedown(ctx, 4, 0, 7);
  drawlinedown(ctx, 5, 1, 6);
  drawlinedown(ctx, 6, 2, 5);
ctx.strokeStyle = "red";
  drawlineright(ctx, 1, 0, 8);
  drawlineright(ctx, 2, 1, 7);
  drawlineright(ctx, 3, 2, 6);
  drawlineright(ctx, 4, 0, 7);
  drawlineright(ctx, 5, 1, 6);
  drawlineright(ctx, 6, 2, 5);
ctx.strokeStyle = "blue";
  drawlinediagW(ctx, 1, 0, 8);
  drawlinediagW(ctx, 2, 1, 7);
  drawlinediagW(ctx, 3, 2, 6);
  drawlinediagW(ctx, 4, 1, 7);
  drawlinediagW(ctx, 5, 2, 6);
  drawlinediagW(ctx, 6, 3, 4);
  drawlinediagW(ctx, 7, 4, 2);
ctx.strokeStyle = "green";
  drawlinediagB(ctx, 1, 0, 8);
  drawlinediagB(ctx, 2, 1, 7);
  drawlinediagB(ctx, 3, 2, 6);
  drawlinediagB(ctx, 4, 1, 7);
  drawlinediagB(ctx, 5, 2, 6);
  drawlinediagB(ctx, 6, 3, 4);
  drawlinediagB(ctx, 7, 4, 2);
  drawlinediagB(ctx, 8, 4, 1);
  drawlinediagB(ctx, 9, 4, 1);
  drawlinediagB(ctx, 0, 4, 1);
  drawlinediagB(ctx, -1, 3, -2);

ctx.fillStyle = "red";
  drawpoint(ctx, 1, 1);
  drawpoint(ctx, 1, 2);
  drawpoint(ctx, 2, 2);
  drawpoint(ctx, 2, 3);

}

function drawpoint(ctx, a, b){
  var ctx = ctx;
  var a = a;
  var b = b;
  const rem = 16;
  ctx.font = "18px";
  ctx.fillText("⬤", 2+(a-1)*rem, 10+(b-1)*rem);
}

function drawlinedown(ctx, a, b, c) {
var ctx = ctx;
var a = a;
var b = b;
var c = c;
const rem = 16;
ctx.beginPath();
ctx.moveTo(6+(a-1)*rem, 6+(b*rem));
ctx.lineTo(6+(a-1)*rem, (b+c)*rem-6);
ctx.stroke(); 
}

function drawlineright(ctx, a, b, c) {
var ctx = ctx;
var a = a;
var b = b;
var c = c;
const rem = 16;
ctx.beginPath();
ctx.moveTo(6+(b*rem), 6+(a-1)*rem);
ctx.lineTo((b+c)*rem-6, 6+(a-1)*rem);
ctx.stroke(); 
}

function drawlinediagW (ctx, pos, start, len) {
var ctx = ctx;
var pos = pos+1;
var start = start;
var len = len;
const rem = 8;
const minus = 10;
ctx.beginPath();
ctx.moveTo(pos*rem - start*rem - minus, pos*rem + start*rem - minus);
ctx.lineTo(pos*rem + len*rem - start*rem - minus, pos*rem + (-len*rem) + start*rem - minus);
ctx.stroke();
}

function drawlinediagB (ctx, pos, start, len) {
var ctx = ctx;
var pos = (pos+1);
var start = start;
var len = len;
const rem = 8;
const minus = 10;
ctx.beginPath();
ctx.moveTo(pos*rem + start*rem - minus, 8*rem-pos*rem + start*rem - minus);
ctx.lineTo(pos*rem + start*rem - len*rem - minus, 8*rem-pos*rem + start*rem - len*rem - minus);
ctx.stroke();
}

