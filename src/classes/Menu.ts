import { dom, events } from "../main";
import { MenuTower } from "../utils/types";
import { MenuItemTower } from "./MenuItemTower";
import { TowerArcaneArcher } from "./towers/TowerArcaneArcher";

export class Menu {
  static readonly towers = [
    {
      id: "arcaneArcher",
      className: TowerArcaneArcher,
      range: 250,
      projectileId: "arcaneArcherProjectile",
      blueprintId: "arcaneArcherBp",
    },
    // {
    //   id: "someTower",
    //   className: SomeTower,
    //   range: 250,
    // },
  ] as const;

  selectedTower: MenuTower | null = null;

  constructor() {
    Menu.towers.forEach((tower) => {
      new MenuItemTower(tower, this.selectTower);
    });
  }

  setSelectedTower = (tower: MenuTower | null) => {
    this.selectedTower = tower;
    dom.removeAllClassesFromAppContainer();
    if (tower !== null) {
      dom.addTowerMouseCursor(tower);
    }
  };

  private selectTower = (tower: MenuTower) => {
    this.setSelectedTower(tower);
    if (this.selectedTower === null) {
      throw new Error("selectedTower is null");
    }
    events.towerBluePrintEvent.addTowerBluePrintMouseMoveEvent(
      this.selectedTower
    );
    events.placeTowerEvent.addPlaceTowerClickEvent(tower);

    events.cleanUpSelectTowerClickEvent.addCleanUpSelectTowerClickEvent();
  };
}

const towerIds = Menu.towers.map((obj) => obj.id);
export type TowerName = (typeof towerIds)[number];

const towerClasses = Menu.towers.map((obj) => obj.className);
export type TowerClasses = typeof towerClasses;

const towerBpIds = Menu.towers.map((obj) => obj.blueprintId);
export type TowerBpName = (typeof towerBpIds)[number];

const towerProjectileIds = Menu.towers.map((obj) => obj.projectileId);
export type TowerProjectileName = (typeof towerProjectileIds)[number];
