export class MenuContainer {
  menuBorder;
  menuContainer;
  menuTowersContainer;
  menuGameStatsContainer;

  constructor(container: HTMLElement) {
    this.menuBorder = document.createElement("div");
    this.menuBorder.id = "menu-border";
    this.menuBorder.classList.add("box-shadow");

    this.menuContainer = document.createElement("div");
    this.menuContainer.id = "menu-container";

    this.menuTowersContainer = document.createElement("div");
    this.menuTowersContainer.id = "menu-towers-container";

    this.menuGameStatsContainer = document.createElement("div");
    this.menuGameStatsContainer.id = "menu-game-stats-container";

    this.menuBorder.appendChild(this.menuContainer);
    this.menuContainer.appendChild(this.menuGameStatsContainer);
    this.menuContainer.appendChild(this.menuTowersContainer);

    container.appendChild(this.menuBorder);
  }

  getMenuContainer = () => {
    return this.menuContainer;
  };

  getMenuTowersContainer = () => {
    return this.menuTowersContainer;
  };

  addChildToMenuTowersContainer = (child: HTMLElement) => {
    this.menuTowersContainer.appendChild(child);
  };

  addMenuItemGold = (goldElement: HTMLElement) => {
    this.menuGameStatsContainer.appendChild(goldElement);
  };

  addMenuItemPlayerHealth = (livesElement: HTMLElement) => {
    this.menuGameStatsContainer.appendChild(livesElement);
  };
}
