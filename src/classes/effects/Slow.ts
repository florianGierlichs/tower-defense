import shortUUID from "short-uuid";

export class Slow {
  id;
  slowStart;
  slowPercentage;
  slowDuration;

  constructor(slowPercentage: number, slowDuration: number) {
    this.id = shortUUID.generate();
    this.slowStart = performance.now();
    this.slowPercentage = slowPercentage;
    this.slowDuration = slowDuration;
  }
}
