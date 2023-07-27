type TowerConfigKeys = keyof typeof TOWER_CONFIGS;

export type TowerConfig = (typeof TOWER_CONFIGS)[TowerConfigKeys];

export type TowerType = TowerConfig["name"];

// TODO separate towers
export const TOWER_CONFIGS = {
  arcaneArcher: {
    name: "arcaneArcher",
    range: 250,
    attackSpeed: 1000,
  },
  someTower: {
    name: "someTower",
    range: 250,
    attackSpeed: 1000,
  },
} as const;
