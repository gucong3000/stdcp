"use strict";
const binary = require("node-pre-gyp");
const bindingPath = binary.find(require.resolve("../package.json"));
module.exports = require(bindingPath);
