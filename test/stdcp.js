"use strict";
const stdcp = require("../src");
const fallback = require("../src/fallback");
const expect = require("expect.js");
const binary = require("node-pre-gyp");

describe("stdcp", () => {
	[
		"8848",
		{},
		() => {},
		null,
		undefined,
		true,
		false,
	].forEach(value => {
		it(`stdcp.set(${value})`, () => {
			expect(stdcp.set).withArgs(value).to.throwException(/^Code page should be a integer\.$/);
		});
	});
	[
		-1,
		Math.PI,
		600,
		0xFFFFFFFF,
	].forEach(value => {
		it(`stdcp.set(${value})`, () => {
			expect(stdcp.set).withArgs(value).to.throwException(/^Invalid code page\.$/);
		});
	});

	it("stdcp.set(stdcp.get())", () => {
		const codepage = stdcp.get();
		expect(typeof codepage).to.equal("number");
		stdcp.set(codepage);
	});
});

describe("fallback to js", () => {
	let binFind;
	before(() => {
		delete require.cache[require.resolve("../src")];
		delete require.cache[require.resolve("../src/binding")];
		binFind = binary.find;
	});
	after(() => {
		binary.find = binFind;
	});
	it("binary.find = null", () => {
		binary.find = null;
		const stdcp = require("../src");
		expect(stdcp.get).to.equal(fallback.get);
	});
});
