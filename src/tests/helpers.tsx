import fs from "fs";
import path from "path";


export const readFile = (filePath: string): string => {
  const absolutePath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error("The expected file does not exist");
  }

  return fs.readFileSync(absolutePath, "utf8");
};

export const packageJsonScripts = (file: string): string => {
  const json = JSON.parse(file);
  return json.scripts;
}



