import { IMAGE_FOLDER } from "./config/constant";
import { createCanvas, loadImage } from "canvas";
const jimp = require("jimp");
const path = require("path");

type optionsType = {
  width: number;
  height: number;
  blur: 10;
};

export class GenerateImage {
  private readonly imageName: string;
  private readonly options: optionsType;

  constructor(imageName: string, options?: optionsType) {
    const defaultOptions = {
      width: 1080,
      height: 1920,
      blur: 10,
    };
    this.imageName = imageName;
    this.options = Object.assign(defaultOptions, options);
  }

  public async getBuffer(): Promise<Buffer> {
    const { width, height, blur } = this.options;
    const folderPath = `../${IMAGE_FOLDER}${this.imageName}`;
    const imagePath = path.resolve(__dirname, folderPath);

    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    const sourceImage = await jimp.read(imagePath);
    const blurImage = sourceImage.blur(blur);
    const blurBuffer = await blurImage.getBufferAsync(jimp.MIME_PNG);

    // Draw Blurry Background
    await loadImage(blurBuffer).then((image) => {
      context.drawImage(
        image,
        width / 2 - 2000 / 2,
        height / 2 - 2000 / 2,
        2000,
        2000
      );
    });

    // Draw Source Image
    await loadImage(imagePath).then((image) => {
      context.drawImage(
        image,
        width / 2 - image.width / 2,
        height / 2 - image.width / 2,
        image.width,
        image.height
      );
    });

    return canvas.toBuffer("image/png");
  }
}
