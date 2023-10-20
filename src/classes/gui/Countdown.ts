export class Countdown {
  private countdownElement;
  private countdownTime;

  constructor(countdownTime: number) {
    this.countdownTime = countdownTime;

    this.countdownElement = document.createElement("p");
    this.countdownElement.id = "countdown";
    this.countdownElement.innerText = this.countdownTime.toString();

    this.startCountdown();
  }

  getContainer = () => {
    return this.countdownElement;
  };

  getCountdownTime = () => {
    return this.countdownTime;
  };

  private startCountdown = () => {
    const countdownInterval = setInterval(() => {
      this.countdownTime--;
      this.countdownElement.innerText = this.countdownTime.toString();

      if (this.countdownTime === 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);
  };
}
