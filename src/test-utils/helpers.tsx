import fs from "fs";
import path from "path";
import assert from "assert";

export const readFile = (filePath: string): string => {
  let file: string;
  try {
    file = fs.readFileSync(path.join(process.cwd(), filePath), "utf8");
  } catch (e) {
    assert(false, "The expected file does not exist");
  }

  return file;
};



