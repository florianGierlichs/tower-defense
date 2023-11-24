import { dom } from "../../main";
import { getAngle } from "../../utils/getAngle";
import { moveX, moveY } from "../../utils/move";
import { reachedTarget } from "../../utils/reachedTarget";
import { Enemy } from "../enemies/Enemy";

export class Projectile {
  id;
  x;
  y;
  damage;
  targetEnemy;
  removeProjectile;
  towerSourceId;
  speed;

  image: HTMLImageElement;
  width: number;
  height: number;

  constructor(
    id: string,
    x: number,
    y: number,
    damage: number,
    speed: number,
    {
      img,
      width,
      height,
    }: { img: HTMLImageElement; width: number; height: number },
    targetEnemy: Enemy,
    removeProjectile: (id: string) => void,
    towerSourceId: string
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.speed = speed;
    this.image = img;
    this.width = width;
    this.height = height;
    this.targetEnemy = targetEnemy;
    this.removeProjectile = removeProjectile;
    this.towerSourceId = towerSourceId;
  }

  draw = () => {
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

  move = () => {
    const angle = getAngle(
      this.x,
      this.y,
      this.targetEnemy.x,
      this.targetEnemy.y
    );

    // move x
    const restDistanceX = Math.abs(this.targetEnemy.x - this.x);

    this.x += moveX({
      distance: restDistanceX - this.speed < 0 ? restDistanceX : this.speed,
      angle: angle,
    });

    // move y
    const restDistanceY = Math.abs(this.targetEnemy.y - this.y);

    this.y += moveY({
      distance: restDistanceY - this.speed < 0 ? restDistanceY : this.speed,
      angle: angle,
    });

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
    this.targetEnemy.reduceHealth(this.damage, this.towerSourceId);
  };

  update = () => {
    this.move();
    this.draw();
  };
}
