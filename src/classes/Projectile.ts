import { ctx, game } from "../main";
import { getAngle } from "../utils/getAngle";
import { Enemy } from "./Enemy";

interface TowerCallbacks {
  removeProjectile: (id: string) => void;
  removeTowerTarget: () => void;
}

export class Projectile {
  id;
  x;
  y;
  targetEnemy;
  width: number = 4;
  color: string = "red";
  speed: number = 5;

  constructor(id: string, x: number, y: number, targetEnemy: Enemy) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.targetEnemy = targetEnemy;
  }

  private draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
    ctx.fillStyle = "pink";
    ctx.fill();
  };

  private move = ({ removeProjectile, removeTowerTarget }: TowerCallbacks) => {
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
      (this.x - this.targetEnemy.x - 1) * (this.x - this.targetEnemy.x + 1) <=
        0 &&
      (this.y - this.targetEnemy.y - 1) * (this.y - this.targetEnemy.y + 1) <= 0
    ) {
      this.collide({ removeProjectile, removeTowerTarget });
    }
  };

  private collide = ({
    removeProjectile,
    removeTowerTarget,
  }: TowerCallbacks) => {
    removeProjectile(this.id);
    this.targetEnemy.reduceHealth();

    if (this.targetEnemy.health === 0) {
      game.enemies.remove(this.targetEnemy.id);
      removeTowerTarget();
    }
  };

  update = ({ removeProjectile, removeTowerTarget }: TowerCallbacks) => {
    this.draw();
    this.move({
      removeProjectile,
      removeTowerTarget,
    });
  };
}
