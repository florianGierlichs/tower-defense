import { wrapper } from "../../main";

export class LoadingScreen {
  loadingScreen;

  constructor() {
    this.loadingScreen = document.createElement("div");
    this.loadingScreen.id = "loading-screen";
    this.loadingScreen.classList.add("box-shadow");
    this.loadingScreen.innerHTML = "Loading...";
    wrapper.appendChild(this.loadingScreen);
  }

  removeLoadingScreen = () => {
    this.loadingScreen.remove();
  };
}
