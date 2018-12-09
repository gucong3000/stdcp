"use strict";
const binding = require("../src/binding");
const expect = require("expect.js");

describe("binding", () => {
	const codepage = binding.get();

	it("binding.get()", () => {
		expect(typeof codepage).to.equal("number");
	});

	it("binding.set(\"999\")", () => {
		expect(binding.set("999")).to.greaterThan(0);
	});

	it("binding.set()", () => {
		expect(binding.set()).to.greaterThan(0);
	});

	it("binding.set(999999)", () => {
		expect(binding.set(999999)).to.greaterThan(0);
	});

	[
		65001,
		850,
		437,
		codepage,
	].filter(Boolean).forEach((code) => {
		it(`binding.set(${code})`, () => {
			binding.set(code);
		});

		it(`binding.get(${code})`, () => {
			expect(binding.get()).to.equal(code);
		});
	});
});
