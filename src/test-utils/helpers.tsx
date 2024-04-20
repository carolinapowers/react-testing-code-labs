import fs from "fs";
import path from "path";
import assert from "assert";

export const readFile = (filePath: string): string => {
  let file: string;

  try {
    file = fs.readFileSync(path.join(process.cwd(), filePath), "utf8");
    console.log(`Test file exists:`, fs.existsSync(file));

  } catch (e) {

    assert(false, "The expected file does not exist");
  }

  return file;
};



