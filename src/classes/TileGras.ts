import { ctxBackground } from "../main";
import { Tile } from "./Tile";
import textures from "../assets/textures.png";

export class TileGras extends Tile {
  image: HTMLImageElement;
  hasTower: boolean = false;

  constructor(id: number, x: number, y: number) {
    super(id, x, y);

    this.image = new Image(64, 64);
  }

  private buildImg = async () => {
    this.image.src = textures;

    await this.image.decode();
    this.drawImg();
  };

  // todo change to gras image
  private drawImg = () => {
    ctxBackground.lineWidth = 1;
    ctxBackground.beginPath();

    const half = 0.5; // to make rect lines thin
    ctxBackground.strokeRect(
      this.x + half,
      this.y + half,
      this.width + half,
      this.height + half
    );
    ctxBackground.strokeText(`${this.id}`, this.x + 10, this.y + 10);
    ctxBackground.strokeText(
      `${this.x}-${this.x + 64}`,
      this.x + 10,
      this.y + 30
    );
    ctxBackground.strokeText(
      `${this.y} ${this.y + 64}`,
      this.x + 10,
      this.y + 50
    );
  };

  setHasTower = () => (this.hasTower = true);

  update = () => {
    this.buildImg();
  };
}
