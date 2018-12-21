"use strict";
const binary = require("node-pre-gyp");
const bindingPath = binary.find(require.resolve("../package.json"));
const binding = require(bindingPath);

binding.get = function get (global) {
	return Promise.resolve().then(() => (
		binding.getSync(global)
	));
};

binding.set = function set (codepage) {
	return Promise.resolve().then(() => (
		binding.setSync(codepage)
	));
};

module.exports = binding;
