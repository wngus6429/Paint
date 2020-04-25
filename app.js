//캔버스 위에 마우스 가져다 대면 커서 바꾸는거.
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "black";
const CANVAS_SIZE = 630;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR; //일단 기본 색상 정함.
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; //Range 조절 두께? 기능

let painting = false; //일단 기본적으로 false, 하지만 클릭하면 true가 되게
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    //console.log("creating path in", x, y);
    ctx.beginPath(); //path 만드는거
    ctx.moveTo(x, y); //그리고 움직임.
  } else {
    //console.log("creating line in", x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
  //console.log(x, y);
}

function onMouseUp(event) {
  stopPainting();
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor; //클릭한 색 불러옴
  ctx.strokeStyle = color; //클릭한 색을 Default로 지정.
  ctx.fillStyle = color; //Fill채우기 기능.
}
//console.log(color);
//console.log(event.target.style);

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
} //console.log(event.target.value);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerHTML = "Paint";
    //ctx.fillStyle = ctx.strokeStyle; 이렇게도 가능하다는거
  }
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

function handleCanvasClick() {
  if (filling) {
    //이걸 붙여야함. 아니면 채우기 하고 선을 그어 만들다가 클릭 떼면 채우기도 바뀜.
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCm(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[✨]"; //이름 정해줘야함.
  link.click(); // 이걸하면 자동으로 콘솔 내의 URL이 클릭이 되어 다운로드 시작.
  //console.log(link);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

//캔버스 존재 확인
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); //마우스 움직일때 이벤트
  canvas.addEventListener("mousedown", startPainting); //클릭할때 발생하는 event
  canvas.addEventListener("mouseup", stopPainting); // 마우스 클릭 손 뗌.
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCm);
}

Array.from(colors).forEach((color) => color.addEventListener("click", handleColorClick));

//console.log(Array.from(colors));
