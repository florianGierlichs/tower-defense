import { dom } from "../../main";
import { getAngle } from "../../utils/getAngle";
import { reachedTarget } from "../../utils/reachedTarget";
import { Enemy } from "../enemies/Enemy";

export class Projectile {
  id;
  x;
  y;
  targetEnemy;
  removeProjectile;
  speed: number = 10;

  image: HTMLImageElement;
  width: number;
  height: number;

  constructor(
    id: string,
    x: number,
    y: number,
    {
      img,
      width,
      height,
    }: { img: HTMLImageElement; width: number; height: number },
    targetEnemy: Enemy,
    removeProjectile: (id: string) => void
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.image = img;
    this.width = width;
    this.height = height;
    this.targetEnemy = targetEnemy;
    this.removeProjectile = removeProjectile;
  }

  private draw = () => {
    const angle = getAngle(
      this.x,
      this.y,
      this.targetEnemy.x,
      this.targetEnemy.y
    );

    dom.ctxGame.save();
    dom.ctxGame.translate(this.x, this.y);
    dom.ctxGame.rotate(angle * (Math.PI / 180)); // convert degrees to radians
    dom.ctxGame.drawImage(this.image, -this.width, -this.height);
    dom.ctxGame.restore();
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
    this.move();
    this.draw();
  };
}
