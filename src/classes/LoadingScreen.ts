export class LoadingScreen {
  loadingScreen;

  constructor() {
    this.loadingScreen = document.createElement("div");
    this.loadingScreen.id = "loading-screen";
    this.loadingScreen.innerHTML = "Loading...";
    document.body.appendChild(this.loadingScreen);
  }

  removeLoadingScreen = () => {
    this.loadingScreen.remove();
  };
}
