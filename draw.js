function clear_draw() {
    console.log("clear_draw");
}
// 画线
let canvas = document.getElementById('canvas');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
let ctx = canvas.getContext('2d');
let painting = false;
var palt = device.mobile() || device.tablet();

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

ctx.fillStyle = 'black';
ctx.strokeStyle = 'none';
ctx.lineWidth = 10;
ctx.lineCap = 'round';
let last;

if (palt) {
console.log("当前使用的设备是手机")
    canvas.ontouchstart = (e) => {
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        last = [x, y]
    }
    canvas.ontouchmove = (e) => {
        // 手机上可能不止一个手指
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        drawLine(last[0], last[1], x, y);
        last = [x, y]
    }

} else {
console.log("当前使用的设备是电脑")

canvas.onmousedown = (e) => {
    painting = true;
    last = [
        e.clientX,
        e.clientY
    ]
};

canvas.onmousemove = (e) => {
    if (painting === true) {
        // ctx.fillRect(e.clientX - 5 , e.clientY - 5, 10, 10);
        drawLine(last[0], last[1], e.clientX, e.clientY);
        last = [e.clientX, e.clientY]
    } else {
        
    }
    // console.log(e.clientX, e.clientY);
};

canvas.onmouseup = () => {
    painting = false;
};

}