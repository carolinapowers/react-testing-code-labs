import fs from "fs";
import path from "path";


export const readFile = (filePath: string): string => {
  const absolutePath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error("The expected file does not exist");
  }

  const file = fs.readFileSync(absolutePath, "utf8");
  console.log(`Test file exists:`, true);

  return file;
};



