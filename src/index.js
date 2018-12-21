"use strict";
let binding;
try {
	binding = require("./binding");
} catch (ex) {
	binding = require("./fallback");
}

function invalidCode (result) {
	if (result) {
		if (result.then) {
			return result.then(invalidCode);
		}
	} else {
		throw new RangeError("Invalid code page.");
	}
}

function setter (setFn) {
	return function set (codepage) {
		if (!Number.isSafeInteger(codepage) || codepage < 0 || codepage > 0xffff) {
			throw new TypeError("`codepage` must be an unsigned integer.");
		}
		return invalidCode(setFn(codepage));
	};
}

function getter (getFn) {
	return function get (global) {
		if (global != null && typeof global !== "boolean") {
			throw new TypeError("`global` should be a boolean.");
		}
		return getFn(global);
	};
}

module.exports = {
	get: getter(binding.get),
	set: setter(binding.set),
	getSync: getter(binding.getSync),
	setSync: setter(binding.setSync),
};
