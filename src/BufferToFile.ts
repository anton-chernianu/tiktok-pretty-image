import { DIST_FOLDER } from "./config/constant";
const path = require("path");
const fs = require("fs");

export class BufferToFile {
  private readonly buffer: Buffer;
  private readonly fileName: string;

  constructor(buffer: Buffer, fileName: string) {
    this.buffer = buffer;
    this.fileName = fileName;
  }

  public async save(): Promise<void> {
    const distPath = path.resolve(__dirname, "../" + DIST_FOLDER);
    if (!fs.existsSync(distPath)) {
      fs.mkdirSync(distPath);
    }
    await fs.writeFileSync(`${distPath}/${this.fileName}`, this.buffer);
    console.log(`Image Saved: ${this.fileName}`);
  }
}
