const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const INITIAL_COLOR = '#2c2c2c';
const saveBtn = document.getElementById('jsSave');

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 700, 700);

ctx.strokeStyle = '#2c2c2c';
ctx.fillStyle ='#2c2c2c';
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(e) {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(e) {
    const brushSize = e.target.value;
    ctx.lineWidth = brushSize;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = 'Fill';
    } else {
        filling = true;
        mode.innerText = 'Paint';
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, 700, 700);
    }
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image
    link.download = 'Export';
    link.click();
}

if(canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));

if(range) {
    range.addEventListener('input', handleRangeChange);
}

if(mode) {
    mode.addEventListener('click', handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener('click', handleSaveClick);
}