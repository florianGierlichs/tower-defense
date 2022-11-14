import { Enemies } from "./classes/Enemies";
import { Tower } from "./classes/Tower";
import { drawPath } from "./draw/drawPath";
import { drawProjectile } from "./draw/drawProjectile";
import "./style.css";
import { getAngle } from "./utils/getAngle";
import { getDistance } from "./utils/getDistance";

const canvas = document.querySelector<HTMLCanvasElement>("#myCanvas")!;
export const ctx = canvas.getContext("2d")!;

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
let angle: null | number = null;

const towers = [new Tower(438, 240), new Tower(210, 320)];

export const enemies = new Enemies(pathNodes);

const tower = {
  x: 210,
  y: 320,
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
  if (time === 2000) {
    console.log("end");
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const distance = getDistance(tower, circle);

  drawPath(ctx, pathNodes);
  towers.forEach((tower) => tower.update());
  enemies.update();

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

  time++;
  requestAnimationFrame(update);
};

update();
