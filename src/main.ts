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
  ctx.strokeStyle = "black";
  ctx.moveTo(0, 100);
  pathNodes.forEach((node) => {
    ctx.lineTo(node[0], node[1]);
  });
  ctx.stroke();
};

const drawCircle = () => {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, 10, 0, Math.PI * 2);
  ctx.fillStyle = circle.color.alive;
  ctx.fill();
};

const drawTower = (color: string) => {
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.fillStyle = color;
  ctx.fillRect(tower.x, tower.y, tower.width, tower.height);
  ctx.stroke();
};

const drawProjectile = () => {
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "red";
  ctx.moveTo(tower.x + tower.width / 2, tower.y + tower.height / 2);
  ctx.lineTo(circle.x, circle.y);
  ctx.stroke();
};

const tower = {
  x: 438,
  y: 240,
  width: 24,
  height: 24,
  distance: 100,
  color: {
    active: "red",
    passive: "green",
  },
};

const circle = {
  x: 20,
  y: 100,
  color: {
    alive: "yellow",
    dead: "purple",
  },
};

const projectile = {
  x: tower.x,
  y: tower.y,
  width: 5,
  height: 5,
  color: "red",
};

let time = 0;
let nodeIndex = 0;

const detectDistance = () => {
  const distance = Math.hypot(circle.x - tower.x, circle.y - tower.y);
  if (distance < tower.distance) {
    drawTower(tower.color.active);

    if (time % 40 === 0) {
      drawProjectile();
    }
  } else {
    drawTower(tower.color.passive);
  }
};

const update = () => {
  if (pathNodes.length === nodeIndex + 1) {
    console.log("end");
    return;
  }

  if (time % 2 === 0) {
    const currentNode = pathNodes[nodeIndex];
    const nextNode = pathNodes[nodeIndex + 1];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

    drawPath();
    drawCircle();
    detectDistance();
  }
  time++;
  requestAnimationFrame(update);
};

update();
