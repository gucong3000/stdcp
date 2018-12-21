"use strict";
const stdcp = require("../src");
const expect = require("chai").expect;
const binary = require("node-pre-gyp");
const util = require("util");

describe("stdcp", () => {
	[
		"8848",
		Math.PI,
		{},
		() => {},
		null,
		undefined,
		true,
		false,
		"",
		-1,
		0xFFFFFFFF,
	].forEach(value => {
		it(`stdcp.setSync(${util.inspect(value)})`, () => {
			expect(() => {
				stdcp.setSync(value);
			}).to.throw("`codepage` must be an unsigned integer.");
		});
	});

	[
		"8848",
		{},
		() => {},
		"",
		-1,
		Math.PI,
		600,
		0xFFFFFFFF,
	].forEach(value => {
		it(`stdcp.getSync(${util.inspect(value)})`, () => {
			expect(() => {
				stdcp.getSync(value);
			}).to.throw("`global` should be a boolean.");
		});
	});

	[
		600,
		999,
	].forEach(value => {
		it(`stdcp.setSync(${value})`, () => {
			expect(() => {
				stdcp.setSync(value);
			}).to.throw("Invalid code page.");
		});

		it(`stdcp.set(${value})`, async () => {
			let error;
			try {
				await stdcp.set(value);
			} catch (ex) {
				error = ex;
			}
			expect(error).to.have.property("message", "Invalid code page.");
		});
	});

	it("stdcp.setSync(stdcp.getSync())", () => {
		const codepage = stdcp.getSync(false);
		expect(typeof codepage).to.equal("number");
		stdcp.setSync(codepage);
	});
});

describe("fallback to js", () => {
	let binFind;
	let envBak;
	before(() => {
		delete require.cache[require.resolve("../src")];
		delete require.cache[require.resolve("../src/binding")];
		delete require.cache[require.resolve("../src/fallback")];
		envBak = Object.assign({}, process.env);
		binFind = binary.find;
	});
	after(() => {
		binary.find = binFind;
		process.env = Object.assign(process.env, envBak);
	});
	it("binary.find = null", () => {
		binary.find = null;
		delete process.env.windir;
		delete process.env.SystemRoot;
		require("../src");
		expect(require.cache[require.resolve("../src/binding")]).to.equal(undefined);
		expect(require.cache[require.resolve("../src/fallback")]).to.have.property("loaded", true);
	});
});
