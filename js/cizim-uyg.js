let canvas = document.getElementById("canvas");
let decBtn = document.getElementById("decrease");
let incBtn = document.getElementById("increase");
let sizeEl = document.getElementById("size");
let chooseColor = document.getElementById("color");
let clearBtn = document.getElementById("clear");
let pencil = canvas.getContext("2d");

let size = 30;
let color = "black";
let isPressed = false;
let x = undefined;
let y = undefined;

canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});
canvas.addEventListener("mouseup", (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    daireCiz(x2, y2);
    cizgiCiz(x2, y2);
    x = x2;
    y = y2;
  }
});

function daireCiz(x, y) {
  pencil.beginPath();
  pencil.arc(x, y, size, 0, 2 * Math.PI);
  pencil.fillStyle = color;
  pencil.fill();
}

function cizgiCiz(x, y) {
  pencil.beginPath();
  pencil.moveTo(x, y);
  pencil.lineTo(x, y);
  pencil.fillStyle = color;
  pencil.fill();
  pencil.stroke();
}

decBtn.addEventListener("click", () => {
  size -= 5;
  if (size <= 0) {
    size = 5;
  }

  sizeEl.innerHTML = size;
});

incBtn.addEventListener("click", () => {
  size += 5;
  if (size > 50) {
    size = 50;
  }

  sizeEl.innerHTML = size;
});

chooseColor.addEventListener("change",(e)=>{
    color=e.target.value;
    

})

clearBtn.addEventListener("click",(e)=>{
    pencil.clearRect(0,0,canvas.weight,canvas.height);
})