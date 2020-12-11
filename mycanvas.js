function getmoves(game) {
  var game = game;
  return fetch('http://usernamea.pythonanywhere.com/hello/some')
  .then(response => response.json())
  .then(data => {
    return data[game];
  });
};

var gameN = "game1"
//getmove(gameN).then(response => console.log(response[0][0]));

function rungame() {
  getmoves("game1").then(r => {
      var i = 1;
      var intervalId = setInterval(function() {
        changemove1(db, r[i][0], r[i][1]);
        i++;
      }, 1000);
      setTimeout(function() {clearInterval(intervalId)

      for (let ii = i; ii >= 0; ii--) {
      setTimeout(function() {
        changemove1(db, r[ii][1], r[ii][0]);
      }, (i + 1) * 1000 + ii * 100);
      }

      }, (r.length) * 1000);
      changemove1(db, r[0][0], r[0][1]);
    });
      /*
      for (let i = r.length - 1; i >= 0; i--) {
      setTimeout(function() {
        changemove1(db, r[i][1], r[i][0]);
      }, (r.length + 1) * 1000 + i * 100);
      */
};


const data = '{ "game1":  [ ["e2", "e4"], ["e7", "e5"] ] }';
var games = JSON.parse(data);
const move_1_w = games.game1[0][0];
const move_1_b = games.game1[0][1];

var movefrom = "";
var moveto = "";

//// This is what our customer data looks like.
//const customerData = [
//  { index: "1", from: "e2", to: "e4"},
//  { index: "2", from: "e7", to: "e5"}
//];

const dbName = "chess1";
let db;
var mymove = "notyet";

let request = indexedDB.open(dbName, 1);
request.onupgradeneeded = function(event) {
  db = event.target.result;
  let game = db.createObjectStore('game', {autoIncrement: true});
};
request.onsuccess = function(event) {
  db = event.target.result;
//  addmove(db, "e2", "e4");
//  changemove1(db, move_1_w, move_1_b);
  changemove1(db, "e3", "e4");
  readmove(db);
};

request.onerror = function(event) { };

function addmove(db, vfrom, vto) {
  let tx = db.transaction(["game"], "readwrite");
  let store = tx.objectStore('game');
  let move = {from: vfrom, to: vto};
  store.add(move);
    // Do something when all the data is added to the database.
  tx.oncomplete = function(event) {
    console.log("All done!");
  };
  tx.onerror = function(event) { };
};

function readmove(db) {
  let tx = db.transaction(['game'], 'readonly');
  let store = tx.objectStore('game');
  let req = store.get(1);
  req.onsuccess = function(event) {
    let move = event.target.result; if (move) {
      movefrom = move.from;
      moveto = move.to;
//      console.log(move.from);
//      console.log(move.to);
    } else {
      console.log("not found")
    }
  }
  req.onerror = function(event) {};
};

function changemove1(db, newfrom, newto) {
  let tx = db.transaction(['game'], 'readwrite');
  let store = tx.objectStore('game');
  let change = {from: newfrom, to: newto};
  let req = store.put(change, 1);
  req.onsuccess = function() { }
};

function deletemove1(db) {
  // open a read/write db transaction, ready for deleting the data
  var tx = db.transaction(["game"], "readwrite");
  tx.oncomplete = function(event) { console.log("DELETED 1 ") };
  tx.onerror = function(event) { };
  var store = tx.objectStore("game");
  var req = store.delete(1);
  req.onsuccess = function(event) { };
};

// vars for counting frames/s, used by the measureFPS function
var frameCount = 0;
var lastTime;
var fpsContainer;
var fps;

var measureFPS = function (newTime) {

    // test for the very first invocation
    if (lastTime === undefined) {
        lastTime = newTime;
        return;
    }

    //calculate the difference between last & current frame
    var diffTime = newTime - lastTime;

    if (diffTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = newTime;
    }

  console.log(fps);

    frameCount++;
};
// var from = newmovefrom;
// var to = newmoveto;

// var from = "e2";
// var to = "e4";
var piece1 = "";
var piece = "";
var piece2 = "";
var dest = "";
var oldfrom = "";

// somewhere
// changemove1(db, "e7", "e5")

//var pause = false;
var loopid;
var mainLoop = function (time) {
  //    measureFPS(time);

  readmove(db);
  if (movefrom == oldfrom) {
    // do nothing
  } else {
    oldfrom = movefrom;
    piece1 = document.querySelector(`#${movefrom}`);
    piece = piece1.innerHTML;
    var piece2 = piece;
    switch (piece2) {
      case '♙':
        break;
      case '♔':
        break;
      case '\u2656\ufe00':
        drawPieceMove("wrq");
        break;
      case '\u2656\ufe01':
        drawPieceMove("wrk");
        break;
      case '\u2657\ufe00':
        drawPieceMove("wbd");
        break;
      case '\u2657\ufe01':
        drawPieceMove("wbl");
        break;
      case '♕':
        drawPieceMove("wq");
        break;
      case '♟':
        break;
      case '♚':
        break;
      case '\u265c\ufe00':
        drawPieceMove("brq");
        break;
      case '\u265c\ufe01':
        drawPieceMove("brk");
        break;
      case '\u265d\ufe00':
        drawPieceMove("bbd");
        break;
      case '\u265d\ufe01':
        drawPieceMove("bbl");
        break;
      case '♛':
        drawPieceMove("bq");
        break;
      default:
        break;
    }
    dest = document.querySelector(`#${moveto}`)
    dest.innerHTML = piece;
    piece1.innerHTML = "";
}

function drawPieceMove(name){
  var name = name;
        var c = document.getElementById(name);
        var ctx = c.getContext("2d" );
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "yellow";
        drawPiece(name, ctx);
}

function drawPiece(name, ctx) {
  var name = name;
  var ctx = ctx;
  switch (name) {
    case 'wrq':
        drawRook(ctx, (moveto.charCodeAt(0)-(48+48)), (-1)*(moveto.charCodeAt(1)-48-9));
      break;
    case 'wrk':
        drawRook(ctx, (moveto.charCodeAt(0)-(48+48)), (-1)*(moveto.charCodeAt(1)-48-9));
      break;
    case 'wbd':
        drawBish(ctx, (moveto.charCodeAt(0)-(48+48)), (-1)*(moveto.charCodeAt(1)-48-9));
      break;
    case 'wbl':
        drawBish(ctx, (moveto.charCodeAt(0)-(48+48)), (-1)*(moveto.charCodeAt(1)-48-9));
      break;
    case 'wq':
        drawQueen(ctx, (moveto.charCodeAt(0)-(48+48)), (-1)*(moveto.charCodeAt(1)-48-9));
      break;
    case 'brq':
        drawRook(ctx, (moveto.charCodeAt(0)-(48+48)), (-1)*(moveto.charCodeAt(1)-48-9));
      break;
    case 'brk':
        drawRook(ctx, (moveto.charCodeAt(0)-(48+48)), (-1)*(moveto.charCodeAt(1)-48-9));
      break;
    case 'bbd':
        drawBish(ctx, (moveto.charCodeAt(0)-(48+48)), (-1)*(moveto.charCodeAt(1)-48-9));
      break;
    case 'bbl':
        drawBish(ctx, (moveto.charCodeAt(0)-(48+48)), (-1)*(moveto.charCodeAt(1)-48-9));
      break;
    case 'bq':
        drawQueen(ctx, (moveto.charCodeAt(0)-(48+48)), (-1)*(moveto.charCodeAt(1)-48-9));
      break;
    default:
      break;
  }
}
// set to


//setTimeout(function(){window.cancelAnimationFrame(loopid);},0);
//if(pause) return;
    loopid = requestAnimationFrame(mainLoop);
};

function runcanvas() {

// var c = document.getElementById("myCanvas");
// var ctx = c.getContext("2d");

var cwrq = document.getElementById("wrq" );
var cwnq = document.getElementById("wnq" );
var cwbl = document.getElementById("wbl" );
var cwq  = document.getElementById("wq"  );
var cwbd = document.getElementById("wbd" );
var cwnk = document.getElementById("wnk" );
var cwrk = document.getElementById("wrk" );
var cbrq = document.getElementById("brq" );
var cbnq = document.getElementById("bnq" );
var cbbl = document.getElementById("bbl" );
var cbq  = document.getElementById("bq"  );
var cbbd = document.getElementById("bbd" );
var cbnk = document.getElementById("bnk" );
var cbrk = document.getElementById("brk" );

var ctxwrq = cwrq.getContext("2d" );
var ctxwnq = cwnq.getContext("2d" );
var ctxwbl = cwbl.getContext("2d" );
var ctxwq  =  cwq.getContext("2d"  );
var ctxwbd = cwbd.getContext("2d" );
var ctxwnk = cwnk.getContext("2d" );
var ctxwrk = cwrk.getContext("2d" );
var ctxbrq = cbrq.getContext("2d" );
var ctxbnq = cbnq.getContext("2d" );
var ctxbbl = cbbl.getContext("2d" );
var ctxbq  =  cbq.getContext("2d"  );
var ctxbbd = cbbd.getContext("2d" );
var ctxbnk = cbnk.getContext("2d" );
var ctxbrk = cbrk.getContext("2d" );

// ctx.strokeStyle = "yellow";
//   drawlinedown(ctx, 3, 2, 6);
//   drawlinedown(ctx, 4, 0, 7);
//   drawlinedown(ctx, 5, 1, 6);
//   drawlinedown(ctx, 6, 2, 5);
// ctx.strokeStyle = "red";
//   drawlineright(ctx, 1, 0, 8);
//   drawlineright(ctx, 2, 1, 7);
//   drawlineright(ctx, 3, 2, 6);
//   drawlineright(ctx, 4, 0, 7);
//   drawlineright(ctx, 5, 1, 6);
//   drawlineright(ctx, 6, 2, 5);
// ctx.strokeStyle = "blue";
//   drawlinediagB(ctx, 1, 0, 8);
//   drawlinediagB(ctx, 2, 1, 7);
//   drawlinediagB(ctx, 3, 2, 6);
//   drawlinediagB(ctx, 4, 1, 7);
//   drawlinediagB(ctx, 5, 2, 6);
//   drawlinediagB(ctx, 6, 3, 4);
//   drawlinediagB(ctx, 7, 4, 2);
// ctx.strokeStyle = "green";
//   drawlinediagW(ctx, 1, 0, 8);
//   drawlinediagW(ctx, 2, 1, 7);
//   drawlinediagW(ctx, 3, 2, 6);
//   drawlinediagW(ctx, 4, 1, 7);
//   drawlinediagW(ctx, 5, 2, 6);
//   drawlinediagW(ctx, 6, 3, 4);
//   drawlinediagW(ctx, 7, 4, 2);
//   drawlinediagW(ctx, 8, 4, 1);
//   drawlinediagW(ctx, 9, 4, 1);
//   drawlinediagW(ctx, 0, 4, 1);
//   drawlinediagW(ctx, -1, 3, -2);
// 
// ctx.fillStyle = "red";
//   drawpoint(ctx, 1, 1);
//   drawpoint(ctx, 1, 2);
//   drawpoint(ctx, 2, 2);
//   drawpoint(ctx, 2, 3);

//// Store the current transformation matrix
//context.save();

ctxnames = [
ctxwrq,
ctxwnq,
ctxwbl,
ctxwq,
ctxwbd,
ctxwnk,
ctxwrk,
ctxbrq,
ctxbnq,
ctxbbl,
ctxbq,
ctxbbd,
ctxbnk,
ctxbrk,
]

//// Restore the transform
//context.save();
//context.restore();

for (let i of ctxnames){
// Use the identity matrix while clearing the canvas
  i.setTransform(1, 0, 0, 1, 0, 0);
  i.clearRect(0, 0, i.canvas.width, i.canvas.height);
  i.lineWidth = 4;
  i.strokeStyle = "yellow";
}

// setupstartpos
drawRook(ctxwrq, 1, 8);
drawBish(ctxwbd, 3, 8);
drawQueen(ctxwq, 4, 8);
drawBish(ctxwbl, 6, 8);
drawRook(ctxwrk, 8, 8);

drawRook(ctxbrq, 1, 1);
drawBish(ctxbbd, 3, 1);
drawQueen(ctxbq, 4, 1);
drawBish(ctxbbl, 6, 1);
drawRook(ctxbrk, 8, 1);

loopid = requestAnimationFrame(mainLoop);

}


function drawBish(ctx, a, b) {
var ctx = ctx;
var a = a;
  var b = b;
const rem = 16;
ctx.translate((a-1)*rem, (b-1)*rem);
  drawlinediagB(ctx, 1, -1.5, 13);
  drawlinediagB(ctx, 1, 1.5, -13);
  drawlinediagW(ctx, 3, 12.5, 13);
  drawlinediagW(ctx, 3, -16.5, -13);
}

function drawRook(ctx, a, b) {
var ctx = ctx;
var a = a;
  var b = b;
const rem = 16;
ctx.translate((a-1)*rem, (b-1)*rem);
drawlineright(ctx, 1, 1, 7);
drawlineright(ctx, 1, -1, -5);
  drawlinedown(ctx, 1, 1, 7);
  drawlinedown(ctx, 1, -1, -5);
}

function drawQueen(ctx, a, b) {
var ctx = ctx;
var a = a;
  var b = b;
const rem = 16;
ctx.translate((a-1)*rem, (b-1)*rem);
drawlineright(ctx, 1, 1, 7);
drawlineright(ctx, 1, -1, -5);
  drawlinedown(ctx, 1, 1, 7);
  drawlinedown(ctx, 1, -1, -5);
  drawlinediagB(ctx, 1, -1.5, 13);
  drawlinediagB(ctx, 1, 1.5, -13);
  drawlinediagW(ctx, 3, 12.5, 13);
  drawlinediagW(ctx, 3, -16.5, -13);
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
const minusr = 8;
ctx.beginPath();
ctx.moveTo(minusr+(a-1)*rem, minusr+(b*rem));
ctx.lineTo(minusr+(a-1)*rem, (b+c)*rem-minusr);
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

function drawlinediagB (ctx, pos, start, len) {
var ctx = ctx;
var pos = pos+1;
var start = start;
var len = len;
const rem = 8;
const minus = 8;
ctx.beginPath();
ctx.moveTo(pos*rem - start*rem - minus, pos*rem + start*rem - minus);
ctx.lineTo(pos*rem + len*rem - start*rem - minus, pos*rem + (-len*rem) + start*rem - minus);
ctx.stroke();
}

function drawlinediagW (ctx, pos, start, len) {
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

//var objectStore = db.transaction(["game"], "readwrite").objectStore("game");
//var request = objectStore.get("1");
//request.onerror = function(event) {
//  // Handle errors!
//};
//
//request.onsuccess = function(event) {
//  // Get the old value that we want to update
//  var data = event.target.result;
//  
//  // update the value(s) in the object that you want to change
//  data.from = "e2";
//
//  // Put this updated object back into the database.
//  var requestUpdate = objectStore.put(data);
//   requestUpdate.onerror = function(event) {
//     // Do something with the error
//   };
//   requestUpdate.onsuccess = function(event) {
//     // Success - the data is updated!
//   };
//};
