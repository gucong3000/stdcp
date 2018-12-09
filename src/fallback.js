"use strict";
const childProcess = require("child_process");
const path = require("path");
const chcpCom = path.join(
	process.env.windir || process.env.SystemRoot || "C:/Windows",
	"System32/chcp.com"
);
const stdout = process.stdout;
const key = "-ms-codepage";

function getCP () {
	if (stdout[key]) {
		return stdout[key];
	}
	let cp = childProcess.spawnSync(chcpCom, {
		stdio: [
			"inherit",
			"pipe",
			"ignore",
		],
		env: {},
		encoding: "ascii",
	}).stdout;
	cp = +/\d+\s*$/.exec(cp)[0];
	stdout[key] = cp;
	return cp;
}

function setCP (codepage) {
	if (stdout[key] && (stdout[key] === codepage)) {
		return 0;
	}
	const status = childProcess.spawnSync("chcp", [String(codepage)], {
		stdio: [
			"inherit",
			"ignore",
			"pipe",
		],
	}).status;
	if (!status) {
		stdout[key] = codepage;
	}
	return status;
}

module.exports = {
	set: setCP,
	get: getCP,
};
