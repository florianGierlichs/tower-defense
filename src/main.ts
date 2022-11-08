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

let time = 0;
let nodeIndex = 0;
let angle: null | number = null;
let projectileHit = false;

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

const drawCircle = (color: string) => {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, 10, 0, Math.PI * 2);
  ctx.fillStyle = color;
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
  ctx.arc(projectile.x, projectile.y, projectile.width, 0, Math.PI * 2);
  ctx.fillStyle = "pink";
  ctx.fill();
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
  destinationX: 0,
  destinationY: 0,
  width: 4,
  color: "red",
  speed: 2,
};

const detectDistance = () => {
  const distance = Math.hypot(circle.x - tower.x, circle.y - tower.y);
  if (distance < tower.distance) {
    drawTower(tower.color.active);

    drawProjectile();
    if (!angle) {
      projectile.destinationX = circle.x;
      projectile.destinationY = circle.y;
      angle = getAngle(tower.x, tower.y, circle.x, circle.y);
    }

    if (projectile.destinationX === Math.round(projectile.x)) {
      drawCircle(circle.color.dead);
      projectileHit = true;
    }

    if (!projectileHit) {
      drawCircle(circle.color.alive);
      projectile.x += projectile.speed * Math.cos((angle * Math.PI) / 180);
      projectile.y += projectile.speed * Math.sin((angle * Math.PI) / 180);
    }
  } else {
    drawTower(tower.color.passive);
    drawCircle(circle.color.alive);
  }
};

const getAngle = (cx: number, cy: number, ex: number, ey: number) => {
  const dy = ey - cy;
  const dx = ex - cx;
  let theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
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

    detectDistance();
  }
  time++;
  requestAnimationFrame(update);
};

update();
