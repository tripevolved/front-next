import { parseImageSources } from "./picture.helpers";

describe("picture.helper", () => {
  describe("parseImageSources", () => {
    const v = "any_source_value";
    const src = v;
    const s = { src };
    const u = undefined;

    it("return empty values to object model", () => {
      expect(parseImageSources({})).toEqual(makeResult());
    });

    it("return base source if has base or src value", () => {
      const result = makeResult(v);
      expect(parseImageSources(s)).toEqual(result);
      expect(parseImageSources({ base: s })).toEqual(result);
    });

    describe("when there are values", () => {
      it("return base", () => {
        expect(parseImageSources({ base: s })).toEqual(makeResult(v));
      });

      it("return base and sm", () => {
        expect(parseImageSources({ sm: s })).toEqual(makeResult(v, v));
      });

      it("return base and md", () => {
        expect(parseImageSources({ md: s })).toEqual(makeResult(v, u, v));
      });

      it("return base and lg", () => {
        expect(parseImageSources({ lg: s })).toEqual(makeResult(v, u, u, v));
      });

      it("return base and xl", () => {
        expect(parseImageSources({ xl: s })).toEqual(makeResult(v, u, u, u, v));
      });

      it("return full values", () => {
        expect(
          parseImageSources({ src, base: s, sm: s, md: s, lg: s, xl: s })
        ).toEqual(makeResult(v, v, v, v, v));
      });

      it("return a mix values", () => {
        expect(parseImageSources({ src, sm: s, lg: s })).toEqual(
          makeResult(v, v, u, v)
        );
      });
    });
  });
});

/* helpers */
function makeResult(
  base?: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string
) {
  return { base, sm, md, lg, xl };
}
