"use strict";
const fallback = require("../src/fallback");
const binding = require("../src/binding");
const expect = require("expect.js");

describe("fallback", () => {
	const codepage = fallback.get();

	it("fallback.get()", () => {
		expect(codepage).to.equal(binding.get());
	});

	it("fallback.set(\"999\")", () => {
		expect(fallback.set("999")).to.greaterThan(0);
	});

	it("fallback.set()", () => {
		expect(fallback.set()).to.greaterThan(0);
	});

	it("fallback.set(999999)", () => {
		expect(fallback.set(999999)).to.greaterThan(0);
	});

	[
		65001,
		850,
		437,
		codepage,
	].filter(Boolean).forEach((code) => {
		it(`fallback.set(${code})`, () => {
			fallback.set(code);
		});

		it(`fallback.set(${code}) with timeout`, () => {
			const timer = Date.now();
			fallback.set(code);
			expect(Date.now() - timer).to.lessThan(9);
		});

		it(`fallback.get(${code})`, () => {
			expect(fallback.get()).to.equal(code);
			expect(code).to.equal(binding.get());
		});
	});
});
