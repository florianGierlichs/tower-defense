import { drawEnemy } from "./draw/drawEnemy";
import { drawPath } from "./draw/drawPath";
import { drawProjectile } from "./draw/drawProjectile";
import { drawTower } from "./draw/drawTower";
import "./style.css";
import { getAngle } from "./utils/getAngle";
import { getDistance } from "./utils/getDistance";

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

const tower = {
  x: 438,
  y: 240,
  width: 24,
  height: 24,
  distance: 100,
  color: "green",
};

const circle = {
  x: 20,
  y: 100,
  color: "yellow",
};

const projectile = {
  x: tower.x,
  y: tower.y,
  destinationX: 0,
  destinationY: 0,
  width: 4,
  color: "red",
  speed: 2,
  hasCollided: false,
};

const update = () => {
  if (pathNodes.length === nodeIndex + 1) {
    console.log("end");
    return;
  }

  if (time % 2 === 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentNode = pathNodes[nodeIndex];
    const nextNode = pathNodes[nodeIndex + 1];
    const distance = getDistance(tower, circle);

    if (!currentNode) {
      return;
    }

    drawPath(ctx, pathNodes);
    drawTower(ctx, tower);
    drawEnemy(ctx, circle);

    if (circle.x < currentNode[0]) {
      circle.x++;
    } else if (circle.y > nextNode[1]) {
      circle.y--;
    } else if (circle.y < nextNode[1]) {
      circle.y++;
    } else {
      nodeIndex++;
    }

    if (distance <= tower.distance) {
      // set angle
      if (!angle) {
        projectile.destinationX = circle.x;
        projectile.destinationY = circle.y;
        angle = getAngle(tower.x, tower.y, circle.x, circle.y);
      }

      // move projectile
      if (!projectile.hasCollided) {
        projectile.x += projectile.speed * Math.cos((angle * Math.PI) / 180);
        projectile.y += projectile.speed * Math.sin((angle * Math.PI) / 180);
      }

      // detect collision
      if (projectile.destinationX === Math.round(projectile.x)) {
        projectile.hasCollided = true;
      } else {
        drawProjectile(ctx, projectile);
      }
    }
  }
  time++;
  requestAnimationFrame(update);
};

update();
