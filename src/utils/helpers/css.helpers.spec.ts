import { makeCn } from "./css.helpers";

describe("css.helpers", () => {
  describe("makeCn", () => {
    const classes = "any_classes";
    const sx = { background: "red" };
    const sxResult = "css-163v9kx";

    it("should return UNDEFINED if it not provides entries", () => {
      expect(makeCn()()).toBe("");
    });

    it("should return provided classes", () => {
      expect(makeCn(classes)()).toBe(classes);
    });

    it("should return provided `SX`", () => {
      expect(makeCn()(sx)).toBe(sxResult);
    });

    it("should return all provided entries", () => {
      const result = [classes, sxResult].join(" ");
      expect(makeCn(classes)(sx)).toBe(result);
    });
  });
});
