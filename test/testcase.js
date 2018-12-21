"use strict";
const expect = require("chai").expect;

function testcase (id) {
	const fallbackId = id === "binding" ? "fallback" : "binding";
	const module = require("../src/" + id);
	const fallback = require("../src/" + fallbackId);
	describe(id, () => {
		const codepage = module.getSync(true);

		it(id + ".getSync(true)", () => {
			expect(codepage).to.be.a("number");
			expect(codepage).to.equal(fallback.getSync(true));
		});

		it(id + ".get(true)", async () => {
			expect(await module.get(true)).to.equal(codepage);
		});

		it(id + ".getSync()", () => {
			const codepage = module.getSync();
			expect(codepage).to.be.a("number");
		});

		it(id + ".get()", async () => {
			expect(await module.get()).to.equal(module.getSync());
		});

		it(id + ".setSync(\"999\")", () => {
			expect(module.setSync("999")).to.to.equal(false);
		});

		it(id + ".setSync()", () => {
			expect(module.setSync()).to.to.equal(false);
		});

		it(id + ".setSync(999999)", () => {
			expect(module.setSync(999999)).to.to.equal(false);
		});

		[
			65001,
			850,
			437,
			codepage,
		].filter(Boolean).forEach((code) => {
			it(`${id}.setSync(${code}) => true`, () => {
				expect(module.setSync(code)).to.equal(true);
			});

			it(`${id}.set(${code}) => true`, async () => {
				expect(await module.set(code)).to.equal(true);
			});

			it(`${id}.getSync() => ${code}`, () => {
				expect(module.getSync()).to.equal(code);
			});

			it(`${id}.get() => ${code}`, async () => {
				expect(await module.get()).to.equal(code);
			});

			if (id === "fallback") {
				it(`${fallbackId}.getSync() => ${code}`, () => {
					expect(fallback.getSync()).to.equal(code);
				});
			}
		});
	});
}

module.exports = testcase;
