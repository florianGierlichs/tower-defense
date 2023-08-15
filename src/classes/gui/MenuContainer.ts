export class MenuContainer {
  menuBorder;
  menuContainer;
  goldPlaceholder;
  menuTowersContainer;

  constructor(container: HTMLElement) {
    this.menuBorder = document.createElement("div");
    this.menuBorder.id = "menu-border";
    this.menuBorder.classList.add("box-shadow");

    this.menuContainer = document.createElement("div");
    this.menuContainer.id = "menu-container";

    this.goldPlaceholder = document.createElement("div");
    this.goldPlaceholder.classList.add("menu-item");
    this.goldPlaceholder.innerHTML = "Gold: 999";

    this.menuTowersContainer = document.createElement("div");
    this.menuTowersContainer.id = "menu-towers-container";

    this.menuBorder.appendChild(this.menuContainer);
    this.menuContainer.appendChild(this.goldPlaceholder);
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
}
