"use strict";
let binding;
try {
	binding = require("./binding");
} catch (ex) {
	binding = require("./fallback");
}

function setCP (codepage) {
	if (typeof codepage !== "number") {
		throw new TypeError("Code page should be a integer.");
	}
	if (!Number.isSafeInteger(codepage) || codepage <= 0 || codepage >> 16 || binding.set(codepage)) {
		throw new RangeError("Invalid code page.");
	}
}

module.exports = Object.assign({}, binding, {
	set: setCP,
});
