import shortUUID from "short-uuid";
import { game } from "../../main";
import { EnemyConfig, PathNode } from "../../utils/types";
import { Enemy } from "../enemies/Enemy";
import { SkeletonGuard } from "../enemies/SkeletonGuard";
import { moveX, moveY } from "../../utils/move";
import { percentageChance } from "../../utils/percentageChance";

export class Demon extends Enemy {
  static readonly config: EnemyConfig = {
    id: "demon",
    name: "Demon",
    health: 700,
    speed: 1,
    maxSlowPercentage: 0,
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
    bountyGold: 100,
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

  constructor(id: string, x: number, y: number) {
    super(id, x, y, Demon.config);
  }

  reduceHealth = (amount: number, _towerSourceId: string) => {
    // needs % spawn condition
    // needs front/back condition in the middle of the path
    // path beginning only front
    // path end only back

    if (Demon.config.special?.value === undefined) {
      throw new Error("Demon.config.special.value is undefined");
    }

    if (percentageChance(Demon.config.special.value)) {
      //this.spawnMinionBehind();
      this.spawnMinionInFront();
    }

    this.currentHealth -= amount;
    if (this.currentHealth <= 0) {
      game.enemies.remove(this.id);
      game.gold.increaseGoldAfterKillEnemy(this.bountyGold);
      game.towers.resetTowerTarget(this.id);
    }
  };

  private spawnMinionBehind = () => {
    const minion = new SkeletonGuard(
      shortUUID.generate(),
      this.lastPosition.x,
      this.lastPosition.y
    );
    minion.setNodeIndex(this.lastPosition.nodeIndex - 1); // -1 because updateNodeTarget increments the index
    minion.updateNodeTarget();
    game.enemies.currentEnemiesPush(minion);
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

    const minion = new SkeletonGuard(shortUUID.generate(), x, y);

    minion.setNodeIndex(this.nodesIndex - 1); // -1 because updateNodeTarget increments the index
    minion.updateNodeTarget();
    game.enemies.currentEnemiesPush(minion);
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

  update = () => {
    this.updateFrames();
    this.updateSlows();
    this.move();
    this.calculateLastPosition();
    this.draw();
  };
}
