import shortUUID from "short-uuid";
import { game } from "../../main";
import { EnemyConfig } from "../../utils/types";
import { Enemy } from "../enemies/Enemy";
import { Icicle } from "../projectiles/Icicle";

export class FrostGuardian extends Enemy {
  static readonly config: EnemyConfig = {
    id: "frostGuardian",
    name: "Frost Guardian",
    health: 1500,
    speed: 1.5,
    maxSlowPercentage: 50,
    special: {
      description: "Chance to freeze tower",
    },
    sWidth: 128,
    sHeight: 128,
    imageScale: 0.8,
    imageTranslateCorrection: {
      x: 12,
      y: -15,
    },
    frameConfig: {
      move: {
        frames: 10,
        animationIterationCircleTime: 1000,
        flipOffsetFrames: 0,
        animationStartRight: {
          sx: 0,
          sy: 0,
        },
        animationStartLeft: {
          sx: 1152,
          sy: 128,
        },
      },
    },
    bountyGold: 300,
  };

  projectiles: Icicle[] = [];

  constructor(id: string, x: number, y: number) {
    super(id, x, y, FrostGuardian.config);
  }

  reduceHealth = (amount: number, towerSourceId: string) => {
    // const probability = 40; // %
    // if (Math.random() <= probability / 100) {
    //   this.shootProjectile(towerSourceId);
    // }
    this.shootProjectile(towerSourceId);

    this.currentHealth -= amount;
    if (this.currentHealth <= 0) {
      game.enemies.remove(this.id);
      game.gold.increaseGoldAfterKillEnemy(this.bountyGold);
      game.towers.resetTowerTarget(this.id);
    }
  };

  private removeProjectile = (id: string) => {
    this.projectiles = this.projectiles.filter(
      (projectile) => projectile.id !== id
    );
  };

  private shootProjectile = (towerId: string) => {
    const target = game.towers.getTowerById(towerId);
    if (!target) {
      throw new Error(`Tower with id ${towerId} not found`);
    }
    this.projectiles.push(
      new Icicle({
        id: shortUUID.generate(),
        x: this.x,
        y: this.y,
        target: target,
        speed: 2,
        removeProjectile: this.removeProjectile,
      })
    );
  };

  updateProjectiles = () => {
    this.projectiles.forEach((projectile) => projectile.update());
  };

  update = () => {
    this.updateFrames();
    this.updateSlows();
    this.move();
    this.draw();
    this.updateProjectiles();
  };
}
