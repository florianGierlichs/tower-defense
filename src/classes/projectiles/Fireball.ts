import shortUUID from "short-uuid";
import { FireExplosion } from "../effects/FireExplosion";
import { Enemy } from "../enemies/Enemy";
import { Projectile } from "./Projectile";

interface FireballProps {
  id: string;
  x: number;
  y: number;
  damage: number;
  speed: number;
  imgConfig: {
    img: HTMLImageElement;
    width: number;
    height: number;
  };
  targetEnemy: Enemy;
  removeProjectile: (id: string) => void;
  towerSourceId: string;
  explosion: {
    add: (fireExplosion: FireExplosion) => void;
    remove: (id: string) => void;
  };
}

export class Fireball extends Projectile {
  explosion;

  constructor({
    id,
    x,
    y,
    damage,
    speed,
    imgConfig,
    targetEnemy,
    removeProjectile,
    towerSourceId,
    explosion,
  }: FireballProps) {
    super(
      id,
      x,
      y,
      damage,
      speed,
      imgConfig,
      targetEnemy,
      removeProjectile,
      towerSourceId
    );

    this.explosion = explosion;
  }

  collide = () => {
    this.removeProjectile(this.id);
    this.explosion.add(
      new FireExplosion({
        id: shortUUID.generate(),
        targetEnemy: this.targetEnemy,
        remove: this.explosion.remove,
        damage: this.damage,
        towerSourceId: this.towerSourceId,
      })
    );
  };

  update = () => {
    this.move();
    this.draw();
  };
}
