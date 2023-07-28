import { dom, game, imageController } from "../../main";
import { getAngle } from "../../utils/getAngle";
import { reachedTarget } from "../../utils/reachedTarget";
import { PathNode } from "../Game";

export class Enemy {
  id;
  x;
  y;
  nodeTarget;
  pathNodes;
  angle;
  width: number = 20;
  height: number = 20;
  color: string = "yellow";
  health: number = 5;
  speed: number = 2;
  nodesIndex: number = 0;

  constructor(id: string, x: number, y: number, pathNodes: PathNode[]) {
    // TODO use random walk frame as start frame, for "individual" movement
    this.id = id;
    this.x = x;
    this.y = y;
    this.pathNodes = [...pathNodes, { x: 864, y: -32 }]; // todo make end node dynamic
    this.nodeTarget = pathNodes[this.nodesIndex];
    this.angle = getAngle(this.x, this.y, this.nodeTarget.x, this.nodeTarget.y);
  }

  private draw = () => {
    // dom.ctxGame.beginPath();
    // dom.ctxGame.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
    // dom.ctxGame.fillStyle = this.color;
    // dom.ctxGame.fill();

    dom.ctxGame.drawImage(
      imageController.getImage("skeleton")!,
      0,
      192,
      64,
      64,
      this.x - 32,
      this.y - 32,
      51.2,
      51.2
    );
  };

  private move = () => {
    // move x
    const restDistanceX = Math.abs(this.nodeTarget.x - this.x);

    if (restDistanceX - this.speed < 0) {
      this.x += restDistanceX * Math.cos((this.angle * Math.PI) / 180);
    } else {
      this.x += this.speed * Math.cos((this.angle * Math.PI) / 180);
    }

    // move y
    const restDistanceY = Math.abs(this.nodeTarget.y - this.y);

    if (restDistanceY - this.speed < 0) {
      this.y += restDistanceY * Math.sin((this.angle * Math.PI) / 180);
    } else {
      this.y += this.speed * Math.sin((this.angle * Math.PI) / 180);
    }

    //reach path node
    if (
      reachedTarget(
        { x: this.x, y: this.y },
        { x: this.nodeTarget.x, y: this.nodeTarget.y }
      )
    ) {
      this.nodesIndex++;
      if (this.pathNodes.length === this.nodesIndex) {
        game.enemies.remove(this.id);
        return;
      }
      this.nodeTarget = this.pathNodes[this.nodesIndex];
      this.angle = getAngle(
        this.x,
        this.y,
        this.nodeTarget.x,
        this.nodeTarget.y
      );
    }
  };

  reduceHealth = () => {
    // TODO include dmg value of tower
    this.health--;

    if (this.health === 0) {
      // TODO can be less than 0 if dmg is higher than remaning health
      game.enemies.remove(this.id);
      game.towers.resetTowerTarget(this.id);
    }
  };

  update = () => {
    this.draw();
    this.move();
  };
}
