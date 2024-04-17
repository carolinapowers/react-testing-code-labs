import fs from "fs";
import path from "path";
import parse5 from "parse5";
import assert from "assert";

const readFile = (filePath: string): string => {
  let file: string;
  try {
    file = fs.readFileSync(path.join(process.cwd(), filePath), "utf8");
  } catch (e) {
    assert(false, "The expected file does not exist");
  }

  return file;
};

const parseFile = (file: string): any => {
  const doc = parse5.parseFragment(file.replace(/\n/g, ""), {
    locationInfo: true
  });
  const nodes = doc.childNodes;

  return nodes;
};

export { readFile, parseFile };

// const fs = require("fs");
// const path = require("path");
// const parse5 = require("parse5");

// const readFile = function(filePath) {
//   let file;
//   try {
//     file = fs.readFileSync(path.join(process.cwd(), filePath), "utf8");
//   } catch (e) {
//     assert(false, "The BookForm.vue file does not exist");
//   }

//   return file;
// };

// const parseFile = function(file) {
//   const doc = parse5.parseFragment(file.replace(/\n/g, ""), {
//     locationInfo: true
//   });
//   const nodes = doc.childNodes;

//   return nodes;
// };


// module.exports.readFile = readFile;
// module.exports.parseFile = parseFile;
