import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#myCanvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pathNodes = [
  [150, 100],
  [150, 400],
  [400, 400],
  [400, 200],
  [500, 200],
  [500, 500],
  [700, 500],
  [700, 0],
];

const drawPath = () => {
  ctx.beginPath();
  ctx.lineWidth = 20;
  ctx.moveTo(0, 100);
  pathNodes.forEach((node) => {
    ctx.lineTo(node[0], node[1]);
  });
  ctx.stroke();
  ctx.closePath();
};

const drawCircle = () => {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, 10, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
};

const circle = {
  x: 20,
  y: 100,
};

let time = 0;
let nodeIndex = 0;

const move = () => {
  if (pathNodes.length === nodeIndex + 1) {
    console.log("end");
    return;
  }

  if (time % 2 === 0) {
    const currentNode = pathNodes[nodeIndex];
    const nextNode = pathNodes[nodeIndex + 1];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPath();

    if (!currentNode) {
      return;
    }

    if (circle.x < currentNode[0]) {
      circle.x++;
    } else if (circle.y > nextNode[1]) {
      circle.y--;
    } else if (circle.y < nextNode[1]) {
      circle.y++;
    } else {
      nodeIndex++;
    }

    drawCircle();
  }
  time++;
  requestAnimationFrame(move);
};

move();
