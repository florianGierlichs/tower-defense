import { ctxGame } from "../main";
import { getAngle } from "../utils/getAngle";
import { reachedTarget } from "../utils/reachedTarget";
import { Enemy } from "./Enemy";

export class Projectile {
  id;
  x;
  y;
  targetEnemy;
  removeProjectile;
  width: number = 4;
  color: string = "red";
  speed: number = 5;

  constructor(
    id: string,
    x: number,
    y: number,
    targetEnemy: Enemy,
    removeProjectile: (id: string) => void
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.targetEnemy = targetEnemy;
    this.removeProjectile = removeProjectile;
  }

  private draw = () => {
    ctxGame.beginPath();
    ctxGame.arc(this.x, this.y, this.width, 0, Math.PI * 2);
    ctxGame.fillStyle = "pink";
    ctxGame.fill();
  };

  private move = () => {
    const angle = getAngle(
      this.x,
      this.y,
      this.targetEnemy.x,
      this.targetEnemy.y
    );

    // move x
    const restDistanceX = Math.abs(this.targetEnemy.x - this.x);

    if (restDistanceX - this.speed < 0) {
      this.x += restDistanceX * Math.cos((angle * Math.PI) / 180);
    } else {
      this.x += this.speed * Math.cos((angle * Math.PI) / 180);
    }

    // move y
    const restDistanceY = Math.abs(this.targetEnemy.y - this.y);

    if (restDistanceY - this.speed < 0) {
      this.y += restDistanceY * Math.sin((angle * Math.PI) / 180);
    } else {
      this.y += this.speed * Math.sin((angle * Math.PI) / 180);
    }

    // check for collision
    if (
      reachedTarget(
        { x: this.x, y: this.y },
        { x: this.targetEnemy.x, y: this.targetEnemy.y }
      )
    ) {
      this.collide();
    }
  };

  private collide = () => {
    this.removeProjectile(this.id);
    this.targetEnemy.reduceHealth();
  };

  update = () => {
    this.draw();
    this.move();
  };
}
