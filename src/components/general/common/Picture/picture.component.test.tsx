import { expectDOMToBe } from "@/helpers/testing-library.helper";
import { render } from "@testing-library/react";
import { MEDIA_SIZES, Picture, TESTID } from "./picture.component";
import { PictureComponentProps } from "./picture.types";

const makeSut = (props?: PictureComponentProps) => render(<Picture {...props} />);

describe("<Picture>", () => {
  const src = "any_source";
  const mdSrc = "any_md_source";
  const lgSrc = "any_lg_source";
  const xlSrc = "any_xl_source";

  describe("when there aren't any images", () => {
    it("NOT render component if there aren't images", () => {
      const wrapper = makeSut();
      expectDOMToBe(wrapper, "");
    });
  });

  describe("when there are images", () => {
    const mdSourceResult = `<source data-testid="${TESTID.SOURCE}" media="(min-width: ${MEDIA_SIZES.MD}px)" srcset="${mdSrc}">`;
    const lgSourceResult = `<source data-testid="${TESTID.SOURCE}" media="(min-width: ${MEDIA_SIZES.LG}px)" srcset="${lgSrc}">`;
    const xlSourceResult = `<source data-testid="${TESTID.SOURCE}" media="(min-width: ${MEDIA_SIZES.XL}px)" srcset="${xlSrc}">`;
    const imageResult = `<img data-testid="${TESTID.IMAGE}" src="${src}">`;

    it("render picture tag with ONE image", () => {
      const wrapper = makeSut({ src });
      const result = `<picture data-testid="${TESTID.PICTURE}" class="picture"><img data-testid="${TESTID.IMAGE}" src="${src}"></picture>`;
      expectDOMToBe(wrapper, result);
    });

    it("render picture tag with media sources: md", () => {
      const wrapper = makeSut({ src, md: { src: mdSrc } });
      const result = `<picture data-testid="${TESTID.PICTURE}" class="picture">${mdSourceResult}${imageResult}</picture>`;
      expectDOMToBe(wrapper, result);
    });

    it("render picture tag with media sources: md and lg", () => {
      const wrapper = makeSut({ src, md: { src: mdSrc }, lg: { src: lgSrc } });
      const sources = [mdSourceResult, lgSourceResult].join("");
      const result = `<picture data-testid="${TESTID.PICTURE}" class="picture">${sources}${imageResult}</picture>`;
      expectDOMToBe(wrapper, result);
    });

    it("render picture tag with media sources: md and lg and xl", () => {
      const wrapper = makeSut({
        src,
        md: { src: mdSrc },
        lg: { src: lgSrc },
        xl: { src: xlSrc },
      });
      const sources = [mdSourceResult, lgSourceResult, xlSourceResult].join("");
      const result = `<picture data-testid="${TESTID.PICTURE}" class="picture">${sources}${imageResult}</picture>`;
      expectDOMToBe(wrapper, result);
    });
  });

  describe("when there are more props", () => {
    it("render with other props", () => {
      const wrapper = makeSut({
        src,
        height: 1,
        width: 1,
        md: { src: mdSrc, height: 2, width: 2 },
        lg: { src: lgSrc },
        xl: { src: xlSrc },
      });
      const snapshot =
        "<picture data-testid=\"picture\" class=\"picture\"><source data-testid=\"source\" media=\"(min-width: 640px)\" srcset=\"any_md_source\" height=\"2\" width=\"2\" style=\"max-height: 2px;\"><source data-testid=\"source\" media=\"(min-width: 920px)\" srcset=\"any_lg_source\"><source data-testid=\"source\" media=\"(min-width: 1440px)\" srcset=\"any_xl_source\"><img data-testid=\"image\" src=\"any_source\" height=\"1\" width=\"1\"></picture>";
      expectDOMToBe(wrapper, snapshot);
    });
  });
});
