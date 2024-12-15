const canvas = document.getElementById("canvas");
const body = document.querySelector("body");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var theColor = "";
var lineW = 5;
let prevX = null;
let prevY = null;
let draw = false;

const ctx = canvas.getContext("2d");

ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

body.style.backgroundColor = "#ffffff";
var theInput = document.getElementById("favcolor");

theInput.addEventListener(
  "input",
  function () {
    theColor = theInput.value;
    body.style.backgroundColor = theColor;

    ctx.fillStyle = theColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  },
  false
);

document.getElementById("rangeInputId").oninput = function () {
  lineW = document.getElementById("rangeInputId").value;
  document.getElementById("rangeOutputId").innerHTML = lineW;
  ctx.lineWidth = lineW;
};

let colors = document.querySelectorAll(".color");
colors = Array.from(colors);
colors.forEach((color) => {
  color.addEventListener("click", () => {
    ctx.strokeStyle = color.dataset.color;
  });
});

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = theColor || "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () => {
  let data = canvas.toDataURL("image/png");
  let a = document.createElement("a");
  a.href = data;
  a.download = "paint.png";
  a.click();
});

window.addEventListener("mousedown", (e) => {
  draw = true;
  prevX = e.clientX;
  prevY = e.clientY;
});

window.addEventListener("mouseup", (e) => (draw = false));

window.addEventListener("mousemove", (e) => {
  if (!draw) return;

  let currentX = e.clientX;
  let currentY = e.clientY;

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();

  prevX = currentX;
  prevY = currentY;
});
