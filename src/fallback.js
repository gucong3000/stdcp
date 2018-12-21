"use strict";
const childProcess = require("child_process");
const path = require("path");
const sysDir = path.join(process.env.windir || process.env.SystemRoot || "C:/Windows", "System32");
const wmicExe = path.join(sysDir, "wbem/WMIC.exe");
const chcpCom = path.join(sysDir, "chcp.com");
const spawnOpts = {
	stdio: [
		"inherit",
		"pipe",
		"ignore",
	],
	env: {},
	encoding: "ascii",
};

function spawnAsync (args, callback) {
	const child = childProcess.spawn(args.shift(), args, spawnOpts);
	const stdout = [];
	child.stdout.on("data", stdout.push.bind(stdout));
	child.on("close", code => {
		// eslint-disable-next-line standard/no-callback-literal
		callback({
			status: code || 0,
			stdout: Buffer.concat(stdout).toString(spawnOpts.encoding),
		});
	});
}

function spawnSync (args, callback) {
	callback(childProcess.spawnSync(args.shift(), args, spawnOpts));
}

function getHelper (spawn, global, callback) {
	spawn(
		global
			? [wmicExe, "os", "get", "codeset"]
			: [chcpCom],
		result => {
			const cp = +/\d+\s*$/.exec(result.stdout)[0];
			callback(cp);
		}
	);
}

function setHelper (spawn, codepage, callback) {
	spawn(
		[
			chcpCom,
			String(codepage),
		],
		result => {
			result = !result.status;
			callback(result);
		}
	);
}

function cb2sync (fn, args) {
	let rst;
	fn.apply(this, args.concat(result => {
		rst = result;
	}));
	return rst;
}

function cb2promise (fn, args) {
	return new Promise(resolve => {
		fn.apply(this, args.concat(resolve));
	});
}

function get (global) {
	return cb2promise(getHelper, [spawnAsync, global]);
}

function getSync (global) {
	return cb2sync(getHelper, [spawnSync, global]);
}

function set (codepage) {
	return cb2promise(setHelper, [spawnAsync, codepage]);
}

function setSync (codepage) {
	return cb2sync(setHelper, [spawnSync, codepage]);
}

module.exports = {
	get,
	set,
	getSync,
	setSync,
};
