let canvas;
let context;
let model = {
  board: "......./......./......./......./......./.......",
  next: "B",
  bottom: [5,5,5,5,5,5,5],
}
let winner = "none";

function flipMatrix(s, w, h) {
  let flipped = '';
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      flipped = flipped + s.charAt((w+1)*i + w - 1 - j);
    }
    if (i != h-1) {flipped = flipped + '/';}
  }
  return flipped;
}

function colsToRows(s, w, h) {
  let arr = '';
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      arr = arr + s.charAt(i + w*j);
    }
    arr = arr + '/';
  }
  return arr;
}

function rDiagToRows(s, w, h) {
  let min = Math.min(w,h);
  let tempMatrix = '';
  for (let i = 0; i < min; i++) {
    for (let j = 0; j <= i; j++) {
      tempMatrix = tempMatrix + s.charAt(i + w*j);
    }
    tempMatrix = tempMatrix + '/';
  }
  for (let i = min - 1 ; i >= 0; i--) {
    if (i != min - 1) {tempMatrix = tempMatrix + '/';}
    for (let j = i; j >=0; j--) {
      tempMatrix = tempMatrix + s.charAt(s.length - 1- (i + (h+1)*j));
    }
  }
  return tempMatrix;
}

function lDiagToRows(s, w, h) {
  return(rDiagToRows(flipMatrix(s, w, h), w, h));
}

function tick() {
  //window.requestAnimationFrame(render);
}

function render(n) {

  context.font = "40pt Calibri";
  if (winner == "none" && (model.board.includes("BBBB")
      || colsToRows(model.board, 7, 6).includes("BBBB") 
      || rDiagToRows(model.board, 7, 6).includes("BBBB")
      || lDiagToRows(model.board, 7, 6).includes("BBBB"))) {
    winner = "blue";
  }
  if (winner == "none" && (model.board.includes("RRRR")
      || colsToRows(model.board, 7, 6).includes("RRRR") 
      || rDiagToRows(model.board, 7, 6).includes("RRRR")
      || lDiagToRows(model.board, 7, 6).includes("RRRR"))) {
    winner = "red";
  }
  if (winner == "blue") {
    context.fillText("Blue wins!", 25, 375);
  }
  if (winner == "red") {
    context.fillText("Red wins!", 25, 375);
  }
  if (!model.board.includes('.') && winner == "none") {
    context.fillText("It's a tie!", 25, 375);
  }
  context.beginPath();
  context.moveTo(25, 25);
  context.lineTo(25, 325);
  context.lineTo(375,325);
  context.lineTo(375,25);
  context.lineTo(25,25);
  context.fillStyle = '#00ff00';
  context.fill();
  
  for(let i = 0; i < 7; i++) {
    for (let j = 0; j < 6; j++) {
      let me = model.board.charAt(i + 8*j);
      context.beginPath();
      context.lineTo(50 + 50*i,50 + 50*j);
      if (me == 'B') { context.strokeStyle = '#0000ff'; }
      if (me == 'R') { context.strokeStyle = '#ff0000'; }
      if (me == '.') { context.strokeStyle = '#ffffff'; }
      context.lineWidth = 40;
      context.lineCap = 'round';
      context.stroke();
    }
  }
  
  tick();
}

document.addEventListener("DOMContentLoaded", () => { 
  canvas = document.querySelector("#connect4");
  context = canvas.getContext("2d");
  render();
})

function roundClick(x) { return Math.floor((x-35)/50) }

document.addEventListener("click", e => {
  
  const col = roundClick(e.x);
  if (col < 0 || col > 6) return;

  const pos = col + 8*(model.bottom[col]);
  if (model.board.charAt(pos) != '.') {
    return;
  }

  model.board =
    model.board.slice(0,pos) +
    model.next +
    model.board.slice(pos+1,47)
  
  model.bottom[col] = model.bottom[col] - 1;

  if (model.next == 'B') {
    model.next = 'R'
  } else if (model.next == 'R') {
    model.next = 'B'
  }
})
