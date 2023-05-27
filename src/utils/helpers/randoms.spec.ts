import { generateHash, randomNumber } from "./random.helpers";

describe("randoms", () => {
  describe("generateHash", () => {
    it("should generate random hash", () => {
      expect(generateHash()).not.toBe(generateHash());
    });

    it("should contains the custom prefix", () => {
      const customPrefix = "any_value";
      expect(generateHash(customPrefix)).toContain(customPrefix);
    });
  });

  describe("randomNumber", () => {
    it("should random number", () => {
      const makeRandomNumber = () => randomNumber(0, 1000);
      expect(makeRandomNumber()).not.toBe(makeRandomNumber());
    });

    it.each([
      { min: 1, max: 5 },
      { min: 5, max: 10 },
      { min: 2, max: 4 },
    ])("should random number between $min and $max", ({ min, max }) => {
      expect(randomNumber(min, max)).toBeGreaterThanOrEqual(min);
      expect(randomNumber(min, max)).toBeLessThanOrEqual(max);
    });
  });
});
