import shortUUID from "short-uuid";
import { game } from "../../main";
import { EnemyConfig, PathNode } from "../../utils/types";
import { Enemy } from "../enemies/Enemy";
import { moveX, moveY } from "../../utils/move";
import { percentageChance } from "../../utils/percentageChance";
import { SkeletonGuardSpawn } from "../enemies/SkeletonGuardSpawn";

export class Demon extends Enemy {
  static readonly config: EnemyConfig = {
    id: "demon",
    name: "Demon",
    health: 2000,
    speed: 1.5,
    maxSlowPercentage: 60,
    special: {
      description: "Chance to spawn minions",
      value: 40,
    },
    sWidth: 110,
    sHeight: 110,
    imageScale: 0.8,
    imageTranslateCorrection: {
      x: 15,
      y: -25,
    },
    frameConfig: {
      move: {
        frames: 12,
        animationIterationCircleTime: 1000,
        flipOffsetFrames: 0,
        animationStartRight: {
          sx: 0,
          sy: 0,
        },
        animationStartLeft: {
          sx: 1210,
          sy: 110,
        },
      },
    },
    bountyGold: 300,
  };

  spawnMinionDistance = 80;
  spawnInFront: boolean = true;
  lastPosition: {
    x: number;
    y: number;
    nodeTarget: PathNode;
    nodeIndex: number;
  } = {
    x: this.x,
    y: this.y,
    nodeTarget: this.nodeTarget,
    nodeIndex: this.nodesIndex,
  };

  spawnedMinions: SkeletonGuardSpawn[] = [];

  constructor(id: string, x: number, y: number) {
    super(id, x, y, Demon.config);
  }

  reduceHealth = (amount: number, _towerSourceId: string) => {
    this.handleSpawnMinion();

    this.currentHealth -= amount;
    if (this.currentHealth <= 0) {
      game.enemies.remove(this.id);
      game.gold.increaseGoldAfterKillEnemy(this.bountyGold);
      game.towers.resetTowerTarget(this.id);
    }
  };

  private handleSpawnMinion = () => {
    if (Demon.config.special?.value === undefined) {
      throw new Error("Demon.config.special.value is undefined");
    }

    if (percentageChance(Demon.config.special.value)) {
      if (this.nodesIndex === 0) {
        this.spawnMinionInFront();
        return;
      }

      if (this.nodesIndex === this.pathNodes.length - 1) {
        this.spawnMinionBehind();
        return;
      }

      this.spawnInFront ? this.spawnMinionInFront() : this.spawnMinionBehind();
      this.spawnInFront = !this.spawnInFront;
    }
  };

  private spawnMinionBehind = () => {
    const minion = new SkeletonGuardSpawn({
      id: shortUUID.generate(),
      x: this.lastPosition.x,
      y: this.lastPosition.y,
      index: this.lastPosition.nodeIndex,
      removeSpawn: this.removeSpawnedMinion,
    });
    this.spawnedMinionsPush(minion);
  };

  private spawnMinionInFront = () => {
    const restDistanceX = Math.abs(this.nodeTarget.x - this.x);
    const restDistanceY = Math.abs(this.nodeTarget.y - this.y);

    const x =
      this.x +
      moveX({
        distance:
          restDistanceX - this.spawnMinionDistance < 0
            ? restDistanceX
            : this.spawnMinionDistance,
        angle: this.angle,
      });

    const y =
      this.y +
      moveY({
        distance:
          restDistanceY - this.spawnMinionDistance < 0
            ? restDistanceY
            : this.spawnMinionDistance,
        angle: this.angle,
      });

    const minion = new SkeletonGuardSpawn({
      id: shortUUID.generate(),
      x,
      y,
      index: this.nodesIndex,
      removeSpawn: this.removeSpawnedMinion,
    });
    this.spawnedMinionsPush(minion);
  };

  private calculateLastPosition = () => {
    if (
      Math.abs(this.x - this.lastPosition.x) > this.spawnMinionDistance ||
      Math.abs(this.y - this.lastPosition.y) > this.spawnMinionDistance
    ) {
      this.lastPosition = {
        x: this.x,
        y: this.y,
        nodeTarget: this.nodeTarget,
        nodeIndex: this.nodesIndex,
      };
    }
  };

  private spawnedMinionsPush = (minion: SkeletonGuardSpawn) => {
    this.spawnedMinions.push(minion);
  };

  private updateSpawnedMinions = () => {
    this.spawnedMinions.forEach((minion) => {
      minion.update();
    });
  };

  removeSpawnedMinion = (id: string) => {
    this.spawnedMinions = this.spawnedMinions.filter((m) => m.id !== id);
  };

  update = () => {
    this.updateFrames();
    this.updateSlows();
    this.move();
    this.calculateLastPosition();
    this.draw();
    this.updateSpawnedMinions();
  };
}
