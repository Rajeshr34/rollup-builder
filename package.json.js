"use strict";
exports.__esModule = true;
var path = require("path");
var fs = require("fs");
var readFileData = JSON.parse(fs.readFileSync(path.resolve("package.json"), "utf8"));
delete readFileData.files;
delete readFileData.private;
delete readFileData.scripts.prepare;
fs.writeFileSync("dist/package.json", JSON.stringify(readFileData));
