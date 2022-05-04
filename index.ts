import { IMAGE_FOLDER } from "./src/config/constant";
import { GenerateImage, BufferToFile } from "./src";
const fs = require("fs");
const path = require("path");
const colors = require("colors");

(async () => {
  console.log(colors.bgCyan("Start make TikTok Pretty Images"));
  const sourcePath = path.join(__dirname, IMAGE_FOLDER);
  const files: string[] = await fs.promises.readdir(sourcePath);
  const filteredFiles = files.filter(
    (file) => file.endsWith(".png") || file.endsWith(".jpg")
  );
  console.log(colors.bgMagenta(`Found ${filteredFiles.length} images`));
  for (const file of filteredFiles) {
    const image = new GenerateImage(file);
    const imageBuffer = await image.getBuffer();
    const makeFile = new BufferToFile(imageBuffer, file);
    await makeFile.save();
  }
  console.log(colors.bgGreen("My job is done!"));
})();
