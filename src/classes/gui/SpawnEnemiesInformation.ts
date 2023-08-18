import { EnemyNames } from "../Waves";

export class SpawnEnemiesInformation {
  container;
  headlineEl;
  countdownEl;
  countdownCurrent;
  countdownStart = 3;
  interval;
  scaleInTransformRemove = [
    { transform: "translateX(0)" },
    { transform: "translateX(-100%)" },
  ];
  scaleInTimingRemove = 300;

  scaleInTransformSpawn = [
    { transform: "translateX(-100%)" },
    { transform: "translateX(0)" },
  ];
  scaleInTimingSpawn = 300;

  startWave;

  constructor(enemyName: EnemyNames, startWave: () => void) {
    this.startWave = startWave;

    this.container = document.createElement("div");
    this.container.id = "spawn-enemies-container";
    this.container.classList.add("box-shadow");

    this.headlineEl = document.createElement("h2");
    this.headlineEl.id = "spawn-enemies-headline";
    this.headlineEl.innerHTML = enemyName;

    this.countdownCurrent = this.countdownStart;
    this.countdownEl = document.createElement("h2");
    this.countdownEl.id = "spawn-enemies-countdown";

    this.interval = setInterval(this.countdown, 1000);

    this.container.appendChild(this.headlineEl);
    this.container.appendChild(this.countdownEl);

    document.body.appendChild(this.container);

    this.container.animate(this.scaleInTransformSpawn, this.scaleInTimingSpawn);
  }

  private countdown = () => {
    if (this.countdownCurrent < 0) {
      this.container.animate(
        this.scaleInTransformRemove,
        this.scaleInTimingRemove
      );
      setTimeout(() => {
        this.container.remove();
      }, this.scaleInTimingRemove);
      clearInterval(this.interval);
      return;
    }

    if (this.countdownCurrent === 0) {
      this.countdownEl.innerHTML = "Start!";
      this.countdownCurrent--;
      this.startWave();
      return;
    }

    this.countdownEl.innerHTML = this.countdownCurrent.toString();
    this.countdownCurrent--;
  };
}
