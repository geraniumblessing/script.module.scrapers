require("babel-polyfill");
const fs            = require("fs");
const path          = require("path");
const babel         = require("babel-standalone");

let providersPath   = path.join(__dirname, "sources_es6/en");
let providers       = fs.readdirSync(providersPath);
let hostsPath       = path.join(__dirname, "hosts_es6");
let hosts           = fs.readdirSync(hostsPath);

const compile       = (inputPath, outputPath) => {
  let inputContent  = fs.readFileSync(inputPath).toString();
  let compileJs     = babel.transform(inputContent, {
    presets: ["es2015", "react", "stage-2"]
  }).code;
  compileJs         = compileJs.replace(/"use strict";/g, "").replace(/'use strict';/g, "");
  fs.writeFileSync(outputPath, compileJs, {flag:'w'});
}



providers.forEach((filename, index) => {
  const inputPath   = path.join(providersPath, `/` + filename);
  compile(inputPath, './sources/en/'+filename);
});

hosts.forEach((filename, index) => {
  const inputPath   = path.join(hostsPath, `/` + filename);
  compile(inputPath, './hosts/'+filename);
});


