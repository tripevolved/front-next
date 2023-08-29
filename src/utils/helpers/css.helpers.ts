import { CSSInterpolation, ClassNamesArg, css, cx } from "@emotion/css";

export const makeCn = (...className: ClassNamesArg[]) => {
  return (...sx: CSSInterpolation[]) => {
    if (sx.length === 0) return cx(className);
    return cx(className, css(sx));
  };
};

export const parseNumericValue = (value?: string | number) => {
  const isNumber = !Number.isNaN(Number(value));
  return isNumber ? `${value}px` : value;
};
